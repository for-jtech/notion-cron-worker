const NOTION_API_BASE_URL = 'https://api.notion.com/v1';
const BOND_API_URL = 'https://www.shinhansec.com/siw/wealth-management/bond-rp/590401/data.do';

export async function getDatabase<T>(NOTION_API_KEY: string, NOTION_DATABASE_ID: string): Promise<T> {
	const response = await fetch(`${NOTION_API_BASE_URL}/databases/${NOTION_DATABASE_ID}/query`, {
		method: 'POST',
		headers: {
			Authorization: `Bearer ${NOTION_API_KEY}`,
			'Content-Type': 'application/json',
			'Notion-Version': '2022-06-28',
		},
	});
	return await response.json();
}

export async function getBondPrices() {
	const URL = 'https://www.shinhansec.com/siw/wealth-management/bond-rp/590401/data.do';
	const response = await fetch(URL);
	const data: {
		body: {
			반복데이타0: string[][];
		};
	} = await response.json();
	return data.body['반복데이타0'];
}

export async function updatePage(NOTION_API_KEY: string, pageId: string, properties: { [key: string]: any }) {
	while (true) {
		try {
			const response = await fetch(`${NOTION_API_BASE_URL}/pages/${pageId}`, {
				method: 'PATCH',
				headers: {
					Authorization: `Bearer ${NOTION_API_KEY}`,
					'Content-Type': 'application/json',
					'Notion-Version': '2022-06-28',
				},
				body: JSON.stringify({
					properties,
				}),
			});
			console.log(response.status, response.statusText);
			if (!response.ok) {
				throw new Error(`Failed to update page: ${response.status} ${response.statusText}`);
			}
			return await response.json();
		} catch (e) {
			await new Promise((resolve) => setTimeout(resolve, 500));
		}
	}
}
