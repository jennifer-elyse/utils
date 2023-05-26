// Example HTML generation using simple JavaScript "components".

function UserImage({ userId, width, height }) {
	const imgUrl = `https://domain.com/api/imgs/${userId}`;
	return `<img src="${imgUrl}" width="${width}" height="${height}" alt="User Profile Image" >`;
}


function UserChip({ userId, name }) {
	return `
		<div style="display: flex; gap: 12px;">
			${UserImage({ userId: userId, width: "100px", height: "100px" })}
			<span>${name}</span>
		</div>
	`;
}


function Page({ heading, content }) {
	return `
		<div>
			<h1>${heading}</h1>
			<div>
				${content}
			</div>
		</div>
	`;
}

// TODO: Check across reports if this is standard for all
function ReportHeader({ auditDetails }) {
	return `
		<div>
			<div>Location</div><div>${auditDetails.location}</div>
		</div>
	`;
}

/*{
	stops:
	[

		{
			"stopNumber": 1,
			"auditNumber": 10980,
			"cases": 145,
			"netError": 0,
			"grossError": 0,
			"customerRepresentative": "Jane Doe"

		}
	]
}

columnDefinitions = [{ key: stopNumber, heading: "Stop #" }, { key: auditNumber, heading: "Audit #" }, { key: cases, heading: "Cases" }
	, { key: netError, heading: "Net Error" }, { key: grossError, heading: "Gross Error" }, { key: customerRepresentative, heading: "Customer Rep." }]*/

function ReportSectionComponent({ title, columnDefinitions=[], rowData }) {
	return `
		<div>{title}</div>
		<table>
			<thead>
				<tr>
				${map(columnDefinitions, definition =>  `
					<th>${definition.heading}</th>
				`)}
				</tr>
			</thead>
			<tbody>
				${map(rowData, row => `
					<tr>
						${map(columnDefinitions, definition =>  `
							<td>${row[definition.key]}</td>
						`)}
					</tr>
				`)}
			</tbody>
		</table>
	`;

}


// Example page with custom map function, to avoid the need for `.join('')` everywhere.
function map(data, predicate) {
	return data.map(predicate).join('');
}

function UserListPage({ users }) {
	return `
		${Page({ heading: 'User Listing', content: `
			${map(users, user => UserChip({ userId: user.id, name: user.name }))}
		` })}
	`;
}
