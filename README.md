# Notion Cron Worker

이 프로젝트는 Notion에서 작업을 자동화하기 위한 크론 워커입니다.

## Test

```sh
pnpm install

touch .dev.vars
echo "NOTION_API_KEY=********" >> .dev.vars
echo "NOTION_DATABASE_ID=********" >> .dev.vars

pnpm wrangler dev --test-scheduled
curl "http://localhost:8787/__scheduled?cron=*+*+*+*+*"
```

## Reference

### Cloudflare Workes

- [Get started - CLI · Cloudflare Workers docs](https://developers.cloudflare.com/workers/get-started/guide/)
- [Secrets · Cloudflare Workers docs](https://developers.cloudflare.com/workers/configuration/secrets/)
- [Cron Triggers · Cloudflare Workers docs](https://developers.cloudflare.com/workers/configuration/cron-triggers/)
- [Setting Cron Triggers · Cloudflare Workers docs](https://developers.cloudflare.com/workers/examples/cron-trigger/)

### Notion API

- [Query a database](https://developers.notion.com/reference/post-database-query)
- [Update page properties](https://developers.notion.com/reference/patch-page)

### Shinhan Bond API

- [장내채권시세 | 신한투자증권 \[p13\]](https://www.shinhansec.com/siw/wealth-management/bond-rp/590401/view.do)
