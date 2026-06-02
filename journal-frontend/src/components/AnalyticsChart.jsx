import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

function AnalyticsChart({ data }) {
  return (
    <div
      style={{
        width: "100%",
        height: 300,
        background: "white",
        padding: "20px",
        borderRadius: "12px",
      }}
    >
      <ResponsiveContainer>
        <BarChart data={data}>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="papers" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default AnalyticsChart;