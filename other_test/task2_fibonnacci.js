function fibonacci(totalNumber) {
	if (totalNumber < 1) return "arguments must be positive and > 0";
	if (totalNumber == 1) return [0];
	if (totalNumber == 2) return [0, 1];

	let first = 0;
	let second = 1;
	let fibonnacciContainer = [];

	for (let index = 1; index <= totalNumber; index++) {
		fibonnacciContainer.push(first);
		let tempValue = first;
		first = second;
		second = tempValue + second;
	}

	return fibonnacciContainer;
}

if (process.argv[2] == undefined) console.log("arguments must be defined");
else {
	console.log("Jumlah bilangan : ", process.argv[2]);
	console.log("Deret : ", ...fibonacci(process.argv[2]));
}
