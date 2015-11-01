Util = {
	combination : function c(arr, length) {
		var ret = [], i;
		//先に特殊な場合を片付ける
		length = +length;
		if (length < 0 || length > arr.length)
			return [];
		if (length == 0)
			return [[]];
		if (length == arr.length)
			return [[].concat(arr)];
		if (length == 1) {
			for ( i = 0; i < arr.length; ++i) {
				ret.push([arr[i]]);
			}
			return ret;
		}
		//2つ以上length-1以下のとき
		var parsed = [].concat(arr);
		var val, inner_ret;
		while (parsed.length >= length) {
			val = [parsed.pop()];
			inner_ret = c(parsed, length - 1);
			for ( i = 0; i < inner_ret.length; ++i) {
				ret.push(inner_ret[i].concat(val));
			}
		}
		return ret;
	},
	// コールバックの形：function(trues, stdout, stderr)
	//trues: UNSATのときはfalse
	sat_solve : function(num_variables, constraints, callback) {
		var solve_string = Module.cwrap('solve_string', 'string', ['string', 'int']);
		var oldPrint = Module.print;
		var oldPrintErr = Module.printErr;
		var stderr = '';
		var stdout = '';
		var result;
		Module['print'] = function(x) {
			stdout += x + "\n";
		}
		Module['printErr'] = function(x) {
			stderr += x + "\n";
		}
		try {
			var input = "p cnf " + num_variables + ' ' + constraints.length + '\n';
			input += constraints.join('\n');
			result = solve_string(input, input.length);
		} catch(e) {
			Module.printErr('Error: ' + e);
		}
		var trues = false;
		if(result) {
			var result_arr = result.split(' ');
			if(result_arr[0]==='SAT'){
				trues = [];
				for(var i=1 ; i<result_arr.length;++i){
					if(+result_arr[i]>0){
						trues.push(+result_arr[i]);
					}
				}
			}
		}
		callback(trues, stdout, stderr);
		Module.print = oldPrint;
		Module.printErr = oldPrintErr;
	}
};
