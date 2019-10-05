;(function() {
	var object = typeof exports !== 'undefined' ? exports : typeof self !== 'undefined' ? self : $.global;

	var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';

	function InvalidCharacterError(message) {
		this.message = message;
	}

	InvalidCharacterError.prototype = new Error;
	InvalidCharacterError.prototype.name = 'InvalidCharacterError';

	// encoder
	// [https://gist.github.com/999166] by [https://github.com/nignag]
	object.btoa || (object.btoa = function(input) {
		var str = String(input);
		// noinspection JSAssignmentUsedAsCondition,CommaExpressionJS
		for (var block, charCode, idx = 0, map = chars, output = ''; str.charAt(idx | 0) || (map = '=', idx % 1); output += map.charAt(63 & block >> 8 - idx % 1 * 8)) {
			charCode = str.charCodeAt(idx += 3 / 4);

			if (charCode > 0xFF) {
				throw new InvalidCharacterError("'btoa' failed: The string to be encoded contains characters outside of the Latin1 range.");
			}

			block = block << 8 | charCode;
		}

		return output;
	});

	// decoder
	// [https://gist.github.com/1020396] by [https://github.com/atk]
	object.atob || (object.atob = function(input) {
		var str = String(input).replace(/[=]+$/, '');

		if (str.length % 4 === 1) {
			throw new InvalidCharacterError("'atob' failed: The string to be decoded is not correctly encoded.");
		}
		// noinspection JSAssignmentUsedAsCondition,CommaExpressionJS
		for (var bc = 0, bs, buffer, idx = 0, output = ''; buffer = str.charAt(idx++); ~buffer && (bs = bc % 4 ? bs * 64 + buffer : buffer, bc++ % 4) ? output += String.fromCharCode(255 & bs >> (-2 * bc & 6)) : 0) {
			buffer = chars.indexOf(buffer);
		}

		return output;
	});
}());