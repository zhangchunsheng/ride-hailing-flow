/**
 * 模拟java的HashMap实现
 * @constructor
 */
function HashMap() {
    var hashTableLength = 1024 * 1024; //2的幂次方
    var hashTable = new Array(hashTableLength); //hashTable表
    var totalSize = 0;//总长度

    /**
     * 新增hashmap值
     * 参数：
     * key   : key值
     * value : 原始Value值
     */
    this.put = function(key, value) {
        if(key != null) {
            var hash = hashCode(key); //进行hashCode，将key转化成整型
            var index = indexFor(hash, hashTable.length);
            //从冲突链表中查询KEY键是否存在，存在的话覆盖新值
            for(var obj = hashTable[index] ; obj != null ; obj = obj.next) {
                if(obj.hash == hash && obj.key == key) {
                    obj.value = value;
                    return obj.value;
                }
            }
            addEntry(hash, key, value, index);
        }
        return false;
    }

    /**
     * 获取hashmap对应值
     * 参数：
     * key   : key值
     */
    this.get = function(key) {
        if(key != null) {
            var hash = hashCode(key); //进行hashCode，将key转化成整型
            var index = indexFor(hash, hashTable.length);
            for(var obj = hashTable[index] ; obj != null ; obj = obj.next) {
                if(obj.hash == hash && obj.key == key) {
                    return obj.value;
                }
            }
        }
        return false;
    }

    /**
     * 删除一个hash值
     * 参数：
     * key   : key值
     */
    this.remove = function(key) {
        if(key != null) {
            var hash = hashCode(key); //进行hashCode，将key转化成整型
            var index = indexFor(hash, hashTable.length);
            var entry = hashTable[index];
            var e = entry;
            var next = null;
            while(e != null) {//循环跑链表，将需要删除值的next对象放到前一个对象的next中
                next = e.next;
                if(e.hash == hash && e.key == key) {
                    if(entry == e) {
                        hashTable[index] = next;
                    } else {
                        entry.next = next;
                    }
                    totalSize--;
                    return true;
                }
                entry = e;
                e = next;
            }
        }
        return false;
    }

    /**
     * 清空hashtable操作
     * 参数：
     * key   : key值
     */
    this.clear = function() {
        hashTable = null;
        hashTable = new Array(hashTableLength);
        totalSize = 0;
        return hashTable;
    }

    /**
     * 判断KEY值是否存在
     * 参数：
     * key  : key值
     */
    this.isSet = function(key) {
        if(key != null) {
            var hash = hashCode(key); //进行hashCode，将key转化成整型
            var index = indexFor(hash, hashTable.length);
            for(var obj = hashTable[index] ; obj != null ; obj = obj.next) {
                if(obj.hash == hash && obj.key == key) {
                    return true;
                }
            }
        }
        return false;
    }

    /**
     * 返回hashMap长度
     */
    this.size = function() {
        return totalSize;
    }

    /**
     * 解决hash冲突的链表结构
     * 参数：
     * hash : hash值，key经过hashCode的值
     * key  : key值
     * value: 原始Value值
     * index: hashTable索引值
     */
    var addEntry = function(hash, key, value, index) {
        var entry = hashTable[index];
        var item = {
            "hash": hash,
            "key": key,
            "value": value,
            "next": entry
        }
        hashTable[index] = item;
        totalSize++; //统计数据表总长度
    };

    /**
     * 经过该函数得到 哈希表 哈希地址
     */
    var indexFor = function(hash, length) {
        return hash & (length - 1);
    };

    /**
     * 通过hashCode函数，将key转化成整型
     */
    var hashCode = function(key) {
        var h = 0, off = 0;
        var length = key.length;
        var temp = null;
        for(var i = 0 ; i < length ; i++) {
            temp = key.charCodeAt(off++);
            h = 31 * h + temp;
            if(h > 0x7fffffff || h < 0x80000000) {
                h = h & 0xffffffff;
            }
        }
        h ^= (h >>> 20) ^ (h >>> 12);
        return h ^ (h >>> 7) ^ (h >>> 4);
    };
}