var targetPages = ["*://ucilnica.fri.uni-lj.si/*", "*://ucilnica.fmf.uni-lj.si/*"];

browser.storage.local.get('use_pw').then((i) => {
	console.log("use_pw: "+i.use_pw);
	if (i.use_pw) return;

	browser.storage.local.get('cookie').then((j) => {
		MoodleSession = j.cookie;
		if (!MoodleSession) return;

		browser.webRequest.onBeforeSendHeaders.addListener(
			rewriteUserAgentHeader,
			{urls: targetPages},
			["blocking", "requestHeaders"]
		);
	});
});

function rewriteUserAgentHeader(e) {
	if (!MoodleSession) return;
	e.requestHeaders.forEach(function(header){
		if (header.name.toLowerCase() == "cookie") {
			// if a cookie is already set, remove it
			if (header.value.includes("; MoodleSession=")) {
				header.value = header.value.replace(
					"; MoodleSession="+getCookie("MoodleSession", header.value),
					"");
			}

			// set my own cookie
			header.value += "; MoodleSession="+MoodleSession;
		}
	});
	return {requestHeaders: e.requestHeaders};
}

function getCookie(cname, all_cookies) {
	var name = cname + "=";
	var ca = all_cookies.split(';');
	for(var i = 0; i <ca.length; i++) {
		var c = ca[i];
		while (c.charAt(0) == ' ') {
			c = c.substring(1);
		}
		if (c.indexOf(name) == 0) {
			return c.substring(name.length, c.length);
		}
	}
	return "";
}
