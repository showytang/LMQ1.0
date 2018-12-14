(function() {
	var DbPromise = function(fun) {
		this.state = 'pending';
		this.resolveList = [];
		this.rejectList = [];
		var _this = this;
		fun(function() {
			_this.resolve.apply(_this, arguments)
		}, function() {
			_this.reject.apply(_this, arguments)
		});
	};
	DbPromise.prototype = {};
	DbPromise.prototype.resolve = function(data) {
		this.state = 'resolved';
		this.data = data;
		var _this = this;
		this.resolveList.forEach(function(fun) {
			_this.data = fun(_this.data)
		});
	};
	DbPromise.prototype.reject = function(data) {
		this.state = 'rejected';
		this.error = data;
		this.rejectList.forEach(function(fun) {
			fun(data);
		});
	};
	DbPromise.prototype.then = function(fun) {
		if(this.state === 'pending') {
			this.resolveList.push(fun);
		} else {
			this.data = fun(this.data);
		}
		return this;
	};
	DbPromise.prototype.catch = function(fun) {
		if(this.state === 'pending') {
			this.rejectList.push(fun);
		} else {
			fun(this.error);
		}
		return this;
	};

	var DB = function(name, upgrade, version) {
		var _this = this;
		if(DB.dbMap[name]) {
			var map = DB.dbMap[name];
			return _open(name, map.upgrade, map.version).then(function(db) {
				_this.db = db;
				return _this;
			}).then(map.nextStep);
		} else {
			return _open(name, upgrade, version).then(function(db) {
				_this.db = db;
				return _this;
			});
		}
	};
	DB.prototype = {};

	DB.prototype.put = function(table, data, tx) {
		return _put(this.db, table, data, tx || this.tx);
	};
	DB.prototype.get = function(table, name, tx) {
		return _get(this.db, table, name, tx || this.tx);
	};
	DB.prototype.delete = function(table, key, tx) {
		return _delete(this.db, table, key, tx || this.tx);
	};
	DB.prototype.index = function(table, idx, key1, key2, tx) {
		return _index(this.db, table, idx, key1, key2, tx || this.tx);
	}
	DB.prototype.createIndex = function(store, indexName, indexColumn, unique) {
		return _createIndex(store, indexName, indexColumn, unique || false);
	}
	DB.prototype.createTable = function() {
		return _createTable();
	}
	DB.prototype.indexStockSum = function(table, idx, key, tx) {
		return _indexStockSum(this.db, table, idx, key, tx);
	}
	DB.prototype.clear = function(table, tx) {
		return _clear(this.db, table, tx || this.tx);
	};
	DB.prototype.transaction = function(table, type, asDefault) {
		var tx = _transaction(this.db, table, type);
		if(asDefault) {
			this.tx = tx;
		}
		return tx;
	};
	DB.prototype.transactionEnd = function() {
		this.tx = void 0;
	};
	DB.prototype.getKv = function(table, k, tx) {
		return _get(this.db, table, k, tx).then(o => (o || {}).v);
	};
	DB.prototype.putKv = function(table, k, v, tx) {
		return _put(this.db, table, {
			k,
			v
		}, tx);
	};

	DB.prototype.getKvStore = function(name) {
		var _this = this;
		return function(k, v) {
			if(v === void 0) {
				return _get(_this.db, name, k).then(o => (o || {}).v);
			} else {
				return _put(_this.db, name, {
					k,
					v
				}).then(o => (o || {}).v);
			}
		}
	};
	DB.dbMap = {};
	this.DB = DB;

	function _open(name, upgrade, version) {
		return new DbPromise(function(resolve, reject) {
			var request = indexedDB.open(name, version);
			request.onupgradeneeded = upgrade;
			request.onsuccess = function() {
				resolve(request.result);
			};
			request.onerror = reject;
		});
	}

	function _put(db, table, data, tx) {
		return new DbPromise(function(resolve, reject) {
			tx = tx || db.transaction(table, 'readwrite');
			var store = tx.objectStore(table);
			var request = store.put(data);
			request.onsuccess = function() {
				resolve(request.result);
			};
			request.onerror = reject;

		});
	}

	function _delete(db, table, key, tx) {
		return new DbPromise(function(resolve, reject) {
			tx = tx || db.transaction(table, 'readwrite');
			var store = tx.objectStore(table);
			var request = store.delete(key);
			request.onsuccess = function() {
				resolve(request.result);
			};
			request.onerror = reject;

		});
	}

	function _clear(db, table, tx) {
		return new Promise(function(resolve, reject) {
			tx = tx || db.transaction(table, 'readwrite');
			var store = tx.objectStore(table);
			var request = store.clear();
			request.onsuccess = function() {
				resolve(request.result);
			};
			request.onerror = reject;
		});
	}

	function _get(db, table, key, tx) {
		return new DbPromise(function(resolve, reject) {
			tx = tx || db.transaction(table, 'readonly');
			var store = tx.objectStore(table);
			if(key) {
				var request = store.get(key);
				request.onsuccess = function() {
					resolve(request.result);
				};
				request.onerror = reject;
			} else {
				try {
					var request = store.getAll();
					request.onsuccess = function() {
						resolve(request.result);
					};
					request.onerror = reject;
				} catch(err) {
					var keyRange = IDBKeyRange.lowerBound(0);
					var request = store.openCursor(keyRange);
					var value = [];
					request.onsuccess = function(e) {
						var cursor = e.target.result;
						if(cursor) {
							value.push(cursor.value);
							cursor.continue();
						} else {
							resolve(value);
						}
					};
				}
			}
		});
	}

	function _transaction(db, table, type) {
		return db.transaction(table, type);
	}

	//索引处理

	function _index(db, table, idx, key1, key2, tx) {
		return new DbPromise(function(resolve, reject) {
			tx = tx || db.transaction(table, 'readonly');
			var store = tx.objectStore(table);
			var index = store.index(idx);

			var request = null;
			if(key2) {
				request = index.openCursor(IDBKeyRange.bound(key1, key2))
			} else {
				request = index.openCursor(IDBKeyRange.only(key1))
			}
			var value = [];
			request.onsuccess = function(e) {
				var cursor = e.target.result;
				if(cursor) {
					value.push(cursor.value);
					cursor.continue();
				} else {
					resolve(value);
				}
			};
			request.onerror = reject;
		});
	}

	function _createIndex(store, indexName, indexColumn, unique) {
		store.createIndex(indexName, indexColumn, {
			unique: unique
		});
	}

})();

var tables = ["user"];

function createTable(db) {
	for(var i = 0; i < tables.length; i++) {
		if(!db.objectStoreNames.contains(tables[i])) {
			var table = db.createObjectStore(tables[i], {
				keyPath: 'id'
			});
			if(tables[i]=="user"){
				table.createIndex("active","active",{unique: false});
			}
		} else if(i == tables.length - 1) {
			//同步非表结构数据
		}
	}
};
