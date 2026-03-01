import Card from '../../../../components/common/Card';

type Player = {
  name: string;
  xp: number;
  highlight?: boolean;
};
const players: Player[] = [
  { name: 'Alice Wonder', xp: 2450 },
  { name: 'Bob Builder', xp: 2100 },
  { name: 'Charlie Tech', xp: 1890 },
  { name: 'Diana Prince', xp: 1650 },
  { name: 'DemoUser', xp: 1250, highlight: true },
  { name: 'Frank Castle', xp: 1100 },
  { name: 'Grace Hopper', xp: 950 },
];
const medalByIndex = ['🥇', '🥈', '🥉'];

function Leaderboard() {
  const top3 = players.slice(0, 3);
  return (
    <view
      style={{
        width: '100%',
        paddingTop: '16px',
        paddingBottom: '16px',
      }}
    >
      {/* Top 3 */}
      <view
        style={{
          flexDirection: 'row',
          justifyContent: 'space-around',
          paddingTop: '12px',
          paddingBottom: '12px',
          borderBottomWidth: '1px',
          borderBottomColor: '#eeeeee',
          display: 'flex',
        }}
      >
        {top3.map((p, idx) => (
          <view key={p.name} style={{ alignItems: 'center' }}>
            <text style={{ fontSize: '28px' }}>{medalByIndex[idx]}</text>
            <text
              style={{
                marginTop: '4px',
                fontWeight: '600',
                fontSize: '14px',
              }}
            >
              {p.name}
            </text>
            <text
              style={{ marginTop: '2px', color: '#666666', fontSize: '12px' }}
            >
              {p.xp} XP
            </text>
          </view>
        ))}
      </view>
      {/* Full list */}
      <view
        style={{
          padding: '12px',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {players.map((p, idx) => (
          <Card>
            <view
              key={p.name}
              className="flex"
              style={{
                width: '100%',
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <view
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  display: 'flex',
                }}
              >
                <text
                  style={{
                    width: '24px',
                    textAlign: 'right',
                    fontWeight: '600',
                    marginRight: '8px',
                  }}
                >
                  {idx + 1}
                </text>
                <text>{p.name}</text>
              </view>
              <text style={{ fontWeight: '500' }}>{p.xp} XP</text>
            </view>
          </Card>
        ))}
      </view>
    </view>
  );
}
export default Leaderboard;
