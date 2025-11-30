// src/components/charts/LineChartCard.tsx
import React from 'react';
import { Card, CardContent, Typography, Box } from '@mui/material';
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

interface LineChartCardProps {
  title: string;
  data: Record<string, any>[];
  xKey: string;
  yKey: string;
}

const LineChartCard: React.FC<LineChartCardProps> = ({
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
            <LineChart
              data={data}
              margin={{ top: 4, right: 12, left: -16, bottom: 2 }}
            >
              <defs>
                <linearGradient
                  id="lineGradientPrimary"
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop offset="0%" stopColor="#6366F1" stopOpacity={0.9} />
                  <stop offset="100%" stopColor="#6366F1" stopOpacity={0.1} />
                </linearGradient>
              </defs>
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="rgba(148,163,184,0.25)"
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
                cursor={{ stroke: 'rgba(148,163,184,0.7)', strokeWidth: 1 }}
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
              <Line
                type="monotone"
                dataKey={yKey}
                stroke="#6366F1"
                strokeWidth={2.4}
                dot={{
                  r: 3,
                  strokeWidth: 1.5,
                  stroke: 'rgba(191,219,254,0.9)',
                  fill: '#0F172A',
                }}
                activeDot={{
                  r: 5,
                  strokeWidth: 2,
                  stroke: '#A5B4FC',
                  fill: '#020617',
                }}
              />
            </LineChart>
          </ResponsiveContainer>
        </Box>
      </CardContent>
    </Card>
  );
};

export default LineChartCard;
