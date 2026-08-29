//===Muthoot FinCorp ONE============================================//
let str1 = "foo";
let str2 = "bar";

console.log(isIsomorphic(str1, str2)); // Output: true
function isIsomorphic(str1, str2) {
    if (str1.length !== str2.length) {
        return false;
    }

    const map1 = {};
    const map2 = {};

    for (let i = 0; i < str1.length; i++) {
        let char1 = str1[i];
        let char2 = str2[i];

        // str1 → str2 must be consistent
        if (map1[char1] && map1[char1] !== char2) {
            return false;
        }

        // str2 → str1 must be consistent
        if (map2[char2] && map2[char2] !== char1) {
            return false;
        }

        // Save the relationship
        map1[char1] = char2;
        map2[char2] = char1;
    }
    return true;
}

//===Impact Analytics============================================//
function productExceptSelf(nums) {
    const result = [];

    let leftProduct = 1;

    for (let i = 0; i < nums.length; i++) {
        result[i] = leftProduct;
        leftProduct *= nums[i];
    }

    let rightProduct = 1;

    for (let i = nums.length - 1; i >= 0; i--) {
        result[i] *= rightProduct;
        rightProduct *= nums[i];
    }

    return result;
}

console.log(productExceptSelf([1, 2, 3, 4])); // Output: [24, 12, 8, 6]

//===Konovo============================================//
const words = ["listen", "silent", "enlist", "hello", "olleh", "world"];
function groupAnagrams(words) {
    let set = new Set(words);

    let result = {}
    for (let anagram of set) {
        let temp = anagram.split('').sort().join('')
        result[temp] = (result[temp] || 0) + 1
    }
    return result;
}
console.log(groupAnagrams(words));

//===styli============================================//
// I/p: 4,30,2,10,5
// O/p: 5,10,2,30,4

arr = [4, 30, 2, 10, 5]
function reverseArray(arr) {
	let start = 0
	let end = arr.length - 1
	while (start < end) {
		let temp = arr[start]
		arr[start] = arr[end]
		arr[end] = temp
		start++
		end--
	}
	return arr
}
console.log(reverseArray(arr))

//===tazapay============================================//
function findUniqueNumbers(arr) {
    let result = []
    for (let num of arr) {
        if (arr.indexOf(num) === arr.lastIndexOf(num)) {
            result.push(num)
        }
    }
    return result
}
console.log(findUniqueNumbers([1, 2, 3, 4, 5, 6, 7, 1, 2]))
