import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend
} from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const data = [
  { name: 'Mon', inbound: 40, outbound: 24 },
  { name: 'Tue', inbound: 30, outbound: 13 },
  { name: 'Wed', inbound: 20, outbound: 38 },
  { name: 'Thu', inbound: 27, outbound: 39 },
  { name: 'Fri', inbound: 18, outbound: 48 },
];

export function BarChartComponent() {
  return (
    <Card className="col-span-2">
      <CardHeader>
        <CardTitle>Weekly Movement</CardTitle>
      </CardHeader>
      <CardContent className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="inbound" fill="#8884d8" name="Inbound" />
            <Bar dataKey="outbound" fill="#82ca9d" name="Outbound" />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}