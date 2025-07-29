import HashMap from "./hashmap.mjs";

const test = new HashMap();

// Initial inserts
test.set("apple", "red");
test.set("banana", "yellow");
test.set("carrot", "orange");
test.set("dog", "brown");
test.set("elephant", "gray");
test.set("frog", "green");
test.set("grape", "purple");
test.set("hat", "black");
test.set("ice cream", "white");
test.set("jacket", "blue");
test.set("kite", "pink");
test.set("lion", "golden");

console.log("Initial length (should be 12):", test.length());
console.table(test.entries());

// Overwrite existing keys
test.set("frog", "crazy");
test.set("hat", "grey");

console.log("Length after overwrites (should still be 12):", test.length());
console.table(test.entries());

// Check capacity and resize
console.log("Capacity before adding moon:", test.capacity);
test.set("moon", "silver");
console.log("Length after adding moon (should be 13):", test.length());
console.log(
  "Capacity after adding moon (should have resized if load factor exceeded):",
  test.capacity
);
console.table(test.entries());

// Test get()
console.log('Get frog (should be "crazy"):', test.get("frog"));
console.log('Get hat (should be "grey"):', test.get("hat"));
console.log("Get non-existent key (should be null):", test.get("non-existent"));

// Test has()
console.log("Has apple (should be true):", test.has("apple"));
console.log("Has non-existent (should be false):", test.has("non-existent"));

// Test remove()
console.log("Remove apple (should be true):", test.remove("apple"));
console.log(
  "Remove non-existent (should be false):",
  test.remove("non-existent")
);
console.log("Length after removing apple (should be 12):", test.length());
console.table(test.entries());

// Test keys(), values(), entries()
console.log("All keys:", test.keys());
console.log("All values:", test.values());
console.log("All entries:", test.entries());

// Test clear()
test.clear();
console.log("Length after clear (should be 0):", test.length());
console.log("Buckets after clear (should be empty array):", test.buckets);
console.table(test.entries());

// Optional: Add more keys to test resizing again after clear
for (let i = 0; i < 50; i++) {
  test.set(`key${i}`, `value${i}`);
}
console.log("Length after adding 50 keys:", test.length());
console.log(
  "Capacity after adding 50 keys (should have resized multiple times):",
  test.capacity
);
console.table(test.entries());
