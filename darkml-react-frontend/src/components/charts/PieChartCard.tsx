// src/components/charts/PieChartCard.tsx
import React from 'react';
import { Card, CardContent, Typography, Box } from '@mui/material';
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

const COLORS = ['#6366F1', '#06B6D4', '#FACC15', '#F97316', '#22C55E'];

interface PieChartCardProps {
  title: string;
  data: { label: string; value: number }[];
}

const PieChartCard: React.FC<PieChartCardProps> = ({ title, data }) => {
  return (
    <Card
      variant="outlined"
      sx={{
        height: 360,
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <CardContent
        sx={{
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          gap: 1.5,
          p: 2.5,
        }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
          <Typography variant="h6" gutterBottom sx={{ mb: 0 }}>
            {title}
          </Typography>
        </Box>
        <Box sx={{ flexGrow: 1, minHeight: 0 }}>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                dataKey="value"
                nameKey="label"
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={3}
                stroke="rgba(15,23,42,1)"
                strokeWidth={2}
              >
                {data.map((entry, i) => (
                  <Cell
                    key={entry.label}
                    fill={COLORS[i % COLORS.length]}
                    fillOpacity={0.9}
                  />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: 'rgba(15,23,42,0.96)',
                  borderRadius: 14,
                  border: '1px solid rgba(75,85,99,0.7)',
                  padding: 10,
                  boxShadow: '0 18px 40px rgba(15,23,42,0.9)',
                }}
                labelStyle={{
                  color: '#E5E7EB',
                  fontSize: 12,
                  marginBottom: 4,
                }}
                itemStyle={{
                  color: '#E5E7EB',
                  fontSize: 12,
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </Box>
      </CardContent>
    </Card>
  );
};

export default PieChartCard;
