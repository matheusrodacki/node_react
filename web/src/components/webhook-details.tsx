// import { useSuspenseQuery } from '@tanstack/react-query';
// import { webhookDetailsSchema } from '../http/schemas/webhooks';
import { WebhookDetailHeader } from './webhook-detail-header';
import { SectionTitle } from './section-title';
import { SectionDataTable } from './section-data-table';
import { CodeBlock } from './ui/code-block';

// interface WebhookDetailsProps {
//   id: string;
// }
// { id }: WebhookDetailsProps
export function WebhookDetails() {
  //   const { data } = useSuspenseQuery({
  //     queryKey: ['webhook', id],
  //     queryFn: async () => {
  //       const response = await fetch(`http://localhost:3333/api/webhooks/${id}`);
  //       const data = await response.json();

  //       return webhookDetailsSchema.parse(data);
  //     },
  //   });

  const overviewData = [
    { key: 'Method', value: 'POST' },
    { key: 'Status Code', value: '200' },
    { key: 'Content-Type', value: 'application/json' },
    { key: 'Content-Length', value: `${0} bytes` },
  ];

  //   const headers = Object.entries(data.headers).map(([key, value]) => {
  //     return { key, value: String(value) };
  //   });

  const headers = [
    { key: 'accept', value: 'application/json' },
    { key: 'user-agent', value: 'Webhook Runner/1.4.2' },
    { key: 'x-request-id', value: 'mocked-request-id' },
  ];

  //   const queryParams = Object.entries(data.queryParams || {}).map(
  //     ([key, value]) => {
  //       return { key, value: String(value) };
  //     }
  //   );

  const queryParams = [
    { key: 'page', value: '1' },
    { key: 'limit', value: '50' },
  ];

  // const body = data.body;
  const body = JSON.stringify(
    {
      event: 'invoice.created',
      payload: {
        id: 'inv_mocked_123',
        amount: 1500,
        currency: 'BRL',
        status: 'pending',
      },
    },
    null,
    2
  );

  return (
    <div className="flex h-full flex-col">
      <WebhookDetailHeader
      // method={data.method}
      // pathname={data.pathname}
      // ip={data.ip}
      // createdAt={data.createdAt}
      />
      <div className="flex-1 overflow-y-auto">
        <div className="space-y-6 p-6">
          <div className="space-y-4">
            <SectionTitle>Request Overview</SectionTitle>
            <SectionDataTable data={overviewData} />
          </div>

          <div className="space-y-4">
            <SectionTitle>Headers</SectionTitle>
            <SectionDataTable data={headers} />
          </div>

          {queryParams.length > 0 && (
            <div className="space-y-4">
              <SectionTitle>Query Parameters</SectionTitle>
              <SectionDataTable data={queryParams} />
            </div>
          )}

          {body && (
            <div className="space-y-4">
              <SectionTitle>Request Body</SectionTitle>
              <CodeBlock code={body} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
