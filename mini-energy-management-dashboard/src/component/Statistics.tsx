import { Card, Statistic } from "antd"
import type { StatisticStylesType } from "antd/es/statistic/Statistic";

interface StatisticsProps {
    value: number;
    title: string;
    background: string;
    color: string;
    prefixIcon?: React.ReactNode;
}

const StatStyles: StatisticStylesType = {
    title: { 
        fontWeight: 600,
        textAlign: 'center',
        padding: '8px 0',
        borderRadius: '4px',
    },
    content: {
        fontSize: '24px',
        textAlign: 'center'
    }
}

export const Statistics = ({ value, title, prefixIcon = null, background, color }: StatisticsProps) => {
    return (
        <Card hoverable size="small" styles={{ body: { padding: 0, paddingBottom: 10 } }}>
            <Statistic
                title={title}
                value={value}
                prefix={prefixIcon}
                styles={{ title: { ...StatStyles.title, color: color, background: background }, content: { ...StatStyles.content } }}
            />
        </Card>
    )
}