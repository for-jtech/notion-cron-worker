export interface Page {
	id: string;
	properties: {
		종목명: Title;
	};
}

export interface Title {
	title: { text: { content: string } }[];
}

export interface BondRowDTO {
	id: string;
	title: string;
	price?: number;
}
