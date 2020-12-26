browser.storage.local.get(['use_pw', 'uname', 'pw']).then((i) => {
	console.log(i);

	if (!i.use_pw) return;

	uname = i.uname;
	if (!uname) return;

	pw = i.pw;
	if (!pw) return;

	if (
		document.querySelector("input#username") &&
		document.querySelector("input#password") &&
		document.querySelector("button#loginbtn[type=submit].btn.btn-block.btn-primary")
	) {
		console.log("Found english")
		document.querySelector("input#username").value = uname;
		document.querySelector("input#password").value = pw;
		document.querySelector("button#loginbtn[type=submit].btn.btn-block.btn-primary").click();
	}
	else if (document.querySelector("span.login")) {
		document.querySelector("span.login").querySelector("a").click();
	}

});
