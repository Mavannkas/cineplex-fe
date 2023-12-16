const fs = require('fs');

// Read the file
const fileContent = fs.readFileSync('e.txt', 'utf-8');

// Split the file content into lines
const lines = fileContent.split('\n').slice(1);

// Iterate through each line
lines.forEach((line) => {
	// Split each line into columns
	const columns = line.split('\t');

	// Extract information
	const path = columns[0];
	const teamsiteRedirection = columns[1];
	const magnoliaProdRedirection = columns[2];
	const magnoliaLiveRedirection = columns[2];

	if (teamsiteRedirection === '' || magnoliaLiveRedirection === '') return;

	if (teamsiteRedirection == magnoliaLiveRedirection) {
		console.log(teamsiteRedirection);
		return;
	}
	const { origin, pathname, search } = new URL(teamsiteRedirection);
	const parsedOrigin = origin
		.replace('https://', '')
		.replace('http://', '')
		.replace('www.', '')
		.replace('.', '\\.');

	console.log(`
	RewriteCond %{HTTP_HOST} ^(www\.)?${parsedOrigin}$ [NC]
	${search ? 'RewriteCond %{QUERY_STRING} ^' + search.slice(1) + '$ [NC]' : ''}
	RewriteRule ^${pathname}$       ${magnoliaLiveRedirection} [R=301,L,NC]
	`);
});
