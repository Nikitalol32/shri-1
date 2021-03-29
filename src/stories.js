//=include templates/people-card/people-card.js
//=include data.js
//=include prepare-data.js
//=include views/leaders/leaders.js

document.addEventListener('DOMContentLoaded', () => {
	const
		body = document.querySelector('body'),
		paramsPage = document.location.search,
		searchParams = new URLSearchParams(paramsPage),
		searchParamsId = Number(searchParams.get('slide')) - 1,
		searchParamsTheme = searchParams.get('theme');

		if (searchParamsTheme === 'light') {
			body.classList.add('light-theme');
		} else {
			body.classList.remove('light-theme');
		}
	
	const def = {
		peopleCard: document.getElementById('people-card-template').innerHTML
	}

	const templates = {
		diagram: doT.template(document.getElementById('diagram').innerHTML, null, def),
		activity: doT.template(document.getElementById('activity').innerHTML, null, def),
		chart: doT.template(document.getElementById('chart').innerHTML, null, def),
		leaders: doT.template(document.getElementById('leaders').innerHTML, null, def),
		vote: doT.template(document.getElementById('vote').innerHTML, null, def)
	}

	globalThis.renderTemplate = function(alias, data) {
		return templates[alias](preparePageData(alias, data));
	}

	const
		{alias, data} = window.renderData[searchParamsId];

	body.innerHTML = globalThis.renderTemplate(alias, data);

	let chart;

	if (alias === 'diagram') {
		const
			canvas = document.getElementById('chart'),
			ctx = canvas.getContext('2d');

		// chart = new Chart(ctx, {
		// 	type: 'doughnut',
		// 	datasets: data.categories.map(({valueText}) => ({
		// 		data: [valueText],
		// 		backgroundColor: 'rgba(0, 0, 0, 1)'
		// 	}))
		// });

		var myChart = new Chart(ctx, {
			type: 'doughnut',
			data: {
				// labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
				datasets: [{
					label: '# of Votes',
					data: data.categories.map(({valueText}) => valueText),
					backgroundColor: [
						'#FFEF99',
						'rgba(54, 162, 235, 0.2)',
						'rgba(255, 206, 86, 0.2)',
						'rgba(75, 192, 192, 0.2)',
					]
				}]
			},
			options: {
			}
		});

	} else if (chart) {
		chart.destroy();
		chart = undefined;
	}
});
