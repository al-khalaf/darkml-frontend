// src/components/charts/BarChartCard.tsx
import React from 'react';
import { Card, CardContent, Typography, Box } from '@mui/material';
import {
  BarChart,
  Bar,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

interface BarChartCardProps {
  title: string;
  data: Record<string, any>[];
  xKey: string;
  yKey: string;
}

const BarChartCard: React.FC<BarChartCardProps> = ({
  title,
  data,
  xKey,
  yKey,
}) => {
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
            <BarChart data={data} margin={{ top: 4, right: 8, left: -16, bottom: 2 }}>
              <defs>
                <linearGradient id="barGradientPrimary" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#6366F1" stopOpacity={0.95} />
                  <stop offset="100%" stopColor="#6366F1" stopOpacity={0.2} />
                </linearGradient>
              </defs>
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="rgba(148,163,184,0.25)"
                vertical={false}
              />
              <XAxis
                dataKey={xKey}
                tick={{ fill: 'rgba(148,163,184,0.9)', fontSize: 11 }}
                axisLine={{ stroke: 'rgba(55,65,81,0.9)' }}
                tickLine={{ stroke: 'rgba(55,65,81,0.9)' }}
              />
              <YAxis
                tick={{ fill: 'rgba(148,163,184,0.9)', fontSize: 11 }}
                axisLine={{ stroke: 'rgba(55,65,81,0.9)' }}
                tickLine={{ stroke: 'rgba(55,65,81,0.9)' }}
              />
              <Tooltip
                cursor={{ fill: 'rgba(15,23,42,0.6)' }}
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
                  color: '#A5B4FC',
                  fontSize: 12,
                }}
              />
              <Bar
                dataKey={yKey}
                fill="url(#barGradientPrimary)"
                radius={[10, 10, 4, 4]}
                maxBarSize={40}
              />
            </BarChart>
          </ResponsiveContainer>
        </Box>
      </CardContent>
    </Card>
  );
};

export default BarChartCard;
