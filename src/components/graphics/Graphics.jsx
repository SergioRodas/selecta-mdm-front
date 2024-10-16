import { Cell, Pie, PieChart, ResponsiveContainer } from 'recharts';

import { COLORS } from '../../utils/Colors';

export const MyPieChart = ({ data }) => {
  return (
    <div className="w-full">
      <ResponsiveContainer width="100%" height={400} aspect={0}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={65}
            outerRadius={150}
            fill="#8884d8"
            dataKey="value"
            label={({ cx, cy, midAngle, innerRadius, outerRadius, index }) => {
              const RADIAN = Math.PI / 180;
              const radius = 5 + (outerRadius - innerRadius);
              const x = cx + radius * Math.cos(-midAngle * RADIAN);
              const y = cy + radius * Math.sin(-midAngle * RADIAN);

              return (
                <text
                  x={x}
                  y={y}
                  fill="white"
                  textAnchor={x > cx ? 'start' : 'end'}
                  dominantBaseline="central"
                >
                  {`${data[index].value}%`}
                </text>
              );
            }}
            labelLine={false}
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};
