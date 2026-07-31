import React from 'react';
import { motion } from 'framer-motion';
import { useCounter } from '../../hooks';

interface StatItem {
  value: number;
  suffix: string;
  label: string;
  prefix?: string;
}

const stats: StatItem[] = [
  { value: 25000, suffix: '+', label: 'Vehicles Available', prefix: '' },
  { value: 600, suffix: '+', label: 'Cities Worldwide', prefix: '' },
  { value: 80, suffix: '+', label: 'Rental Partners', prefix: '' },
  { value: 98, suffix: '%', label: 'Customer Satisfaction', prefix: '' },
];

const StatCounter: React.FC<StatItem & { delay: number }> = ({ value, suffix, label, prefix, delay }) => {
  const { count, ref } = useCounter(value, 2200);

  return (
    <motion.div
      ref={ref as any}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay }}
      className="text-center"
    >
      <div className="text-4xl md:text-5xl font-extrabold text-primary-900 mb-2">
        {prefix}{count.toLocaleString()}{suffix}
      </div>
      <div className="text-muted text-sm font-medium">{label}</div>
    </motion.div>
  );
};

const Stats: React.FC = () => {
  return (
    <section className="relative -mt-1 bg-white border-b border-border">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-16">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
          {stats.map((stat, i) => (
            <StatCounter key={stat.label} {...stat} delay={i * 0.1} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Stats;
