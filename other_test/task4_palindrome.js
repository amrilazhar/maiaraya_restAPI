function palindrome(stringCheck) {
	const regex = /[^a-z0-9]/g;
	const cleanedString = stringCheck.toLowerCase().replace(regex, "");
	let reversedString = cleanedString.split("").reverse().join("");

	if (reversedString == cleanedString) {
		return true;
	} else return false;
}

const readline = require("readline");
const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout,
});

rl.question("write the sentence / number / word : ", (answer) => {
	if (answer == undefined) console.log("arguments must be defined");
	else {
		console.log(palindrome(answer));
	}

	rl.close();
});
