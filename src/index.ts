import { getBondPrices, getDatabase, updatePage } from './api';
import { Page, BondRowDTO } from './types';

export default {
	async scheduled(controller: ScheduledController, env: Env, ctx: ExecutionContext) {
		const { NOTION_API_KEY, NOTION_DATABASE_ID } = env;
		await updateBondPrices(NOTION_API_KEY, NOTION_DATABASE_ID);
	},
};

async function updateBondPrices(NOTION_API_KEY: string, NOTION_DATABASE_ID: string) {
	const data: { results: Page[] } = await getDatabase(NOTION_API_KEY, NOTION_DATABASE_ID);
	const rows: BondRowDTO[] = data.results.map((page: Page) => {
		return {
			id: page.id,
			title: page.properties['종목명'].title[0].text.content,
		};
	});
	// console.log(rows);
	const priceMap = new Map(
		(await getBondPrices()).map((data: string[]) => {
			return [data[0].trim(), Number.parseFloat(data[7])];
		})
	);
	rows.forEach((row) => {
		if (priceMap.has(row.title)) {
			row.price = priceMap.get(row.title) ?? 0;
		}
	});
	for (const row of rows) {
		console.log(row.title, row.price);
		await updatePage(NOTION_API_KEY, row.id, {
			현재가: { number: row.price ?? 0 },
		});
	}
}
