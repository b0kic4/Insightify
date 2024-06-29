import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function SettingsComponent() {
  return (
    <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-2">
      <Card>
        <CardHeader>
          <CardTitle>Developer Tools</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="relative">
            <Button disabled>Generate API Keys</Button>
            <span className="absolute top-0 right-0 bg-yellow-400 text-yellow-900 text-xs font-bold px-2 py-1 rounded-full">
              Coming Soon
            </span>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Support and Feedback</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-row gap-2">
          <a href="mailto:insightifyyy@gmail.com?subject=Contacting for Support">
            <Button>Contact Support</Button>
          </a>
          <a href="mailto:insightifyyy@gmail.com?subject=Insightify Feedback">
            <Button>Submit Feedback</Button>
          </a>
        </CardContent>
      </Card>
    </div>
  );
}
