function preparePageData(alias, data) {
	if (alias === 'chart') {
		const
			values = data.values.map((statistic) => Number(statistic.value)),
			maxValue = Math.max.apply(null, values)

		const
			calculatePercent = (maxValue, value) => Math.floor(100/maxValue * value);

		values.forEach((value, i) => data.values[i].calculatedPercent = calculatePercent(maxValue, value))
	}

	if (alias === 'activity') {
		const definingSizeComments = (commitsByHours, commits) => {
			if (commits === 0) {
				commitsByHours.push({commits: commits, mod: 'min'});
	
			} else if (commits === 1 || commits === 2) {
				commitsByHours.push({commits: commits, mod: 'mid'});
	
			} else if (commits === 3 || commits === 4) {
				commitsByHours.push({commits: commits, mod: 'max'});
	
			} else {
				commitsByHours.push({commits: commits, mod: 'extra'});
			}
		}

		const
			days = data.data;

		const commitsByHours = {
			one: {},
			two: {}
		}

		for(let day in days) {
			const commitsByHoursOne = commitsByHours.one[day] = [];

			days[day].forEach((commits) => {
				definingSizeComments(commitsByHoursOne, commits);
			})

			data.data = commitsByHours;

			const commitsByHoursTwo = commitsByHours.two[day] = [];

			for(let i = 0; i < days[day].length; i += 2) {
				let commits = commitsByHoursOne[i].commits;
				commits += commitsByHoursOne[i + 1].commits;
				definingSizeComments(commitsByHoursTwo, commits);
			}
		}
	}

	if (alias === 'diagram') {
		const
			categories = data.categories;

		for (let i = 0; i < categories.length; i++) {
			categories[i].valueText = parseInt(categories[i].valueText);
			categories[i].differenceText = parseInt(categories[i].differenceText);
		}
	}

	return data;
}
