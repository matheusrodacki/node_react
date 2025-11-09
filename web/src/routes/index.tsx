import { createFileRoute } from '@tanstack/react-router';
import { Panel, PanelGroup, PanelResizeHandle } from 'react-resizable-panels';
import { Sidebar } from '../components/sidebar';
import { WebhookDetails } from '../components/webhook-details';

export const Route = createFileRoute('/')({
  component: Index,
});

function Index() {
  return (
    <div className="h-screen bg-zinc-900">
      <PanelGroup direction="horizontal">
        <Panel defaultSize={20} minSize={15} maxSize={40}>
          <Sidebar />
        </Panel>
        <PanelResizeHandle className="w-px bg-zinc-700 hover:bg-zinc-600 transition-colors duration-150" />
        <Panel defaultSize={80} minSize={60}>
          <div className="flex h-full flex-col">
            <WebhookDetails />
          </div>
        </Panel>
      </PanelGroup>
    </div>
  );
}
