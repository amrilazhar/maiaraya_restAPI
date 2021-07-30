function pangkatRekursi(value, pangkat, result) {
	if (pangkat > 1) {
		return pangkatRekursi(value, pangkat - 1, result * value);
	}
	return result;
}

function printNilai(bilangan, pangkat) {
	if (bilangan < 0) return "first argumen must be positive";
	if (pangkat < 0 || Number.isInteger(pangkat))
		return "second argumen must be positive or integer";
	if (pangkat == 0) return 1;

	let returnValue = pangkatRekursi(bilangan, pangkat, bilangan);
	return returnValue;
}

let args = process.argv.slice(2);
if (args[0] == undefined || args[1] == undefined)
	console.log("arguments must be defined");
else {
	console.log(printNilai(args[0], args[1]));
}
