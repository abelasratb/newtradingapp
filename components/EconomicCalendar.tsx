
import React, { useState, useMemo } from 'react';
import { 
  Calendar, Clock, Filter, AlertTriangle, 
  ArrowUpRight, ArrowDownRight, Minus, 
  Search, Info, Bell, ChevronDown, ChevronRight
} from 'lucide-react';

interface EconomicEvent {
  id: string;
  date: string; // ISO format: YYYY-MM-DD
  time: string; // UTC time: HH:mm
  currency: string;
  event: string;
  impact: 'Low' | 'Medium' | 'High';
  actual?: string;
  forecast?: string;
  previous?: string;
}

// Helper to get dates for the current week (Monday to Friday)
const getThisWeek = () => {
  const curr = new Date();
  const first = curr.getDate() - curr.getDay() + 1; // Monday
  const week = [];
  for (let i = 0; i < 5; i++) {
    const d = new Date(curr.setDate(first + i));
    week.push(d.toISOString().split('T')[0]);
  }
  return week;
};

const weekDays = getThisWeek();

const MOCK_EVENTS: EconomicEvent[] = [
  { id: '1', date: weekDays[4], time: '13:30', currency: 'USD', event: 'Non-Farm Payrolls (NFP)', impact: 'High', forecast: '185K', previous: '216K' },
  { id: '2', date: weekDays[4], time: '13:30', currency: 'USD', event: 'Unemployment Rate', impact: 'High', forecast: '3.8%', previous: '3.7%' },
  { id: '3', date: weekDays[1], time: '06:00', currency: 'EUR', event: 'German CPI (MoM)', impact: 'High', actual: '0.2%', forecast: '0.1%', previous: '0.1%' },
  { id: '4', date: weekDays[2], time: '07:30', currency: 'GBP', event: 'Construction PMI', impact: 'Medium', actual: '48.8', forecast: '47.5', previous: '46.8' },
  { id: '5', date: weekDays[3], time: '11:45', currency: 'USD', event: 'S&P Global Services PMI', impact: 'Medium', forecast: '51.2', previous: '51.4' },
  { id: '6', date: weekDays[0], time: '18:30', currency: 'AUD', event: 'AIG Manufacturing Index', impact: 'Low', actual: '-12.4', forecast: '-10.0', previous: '-11.5' },
  { id: '7', date: weekDays[1], time: '22:50', currency: 'JPY', event: 'Monetary Policy Meeting Minutes', impact: 'Medium', previous: '-' },
  { id: '8', date: weekDays[2], time: '12:00', currency: 'CAD', event: 'Ivey PMI', impact: 'Low', forecast: '55.0', previous: '56.3' },
  { id: '9', date: weekDays[3], time: '16:00', currency: 'USD', event: 'FOMC Meeting Minutes', impact: 'High', previous: '-' },
];

export const EconomicCalendar: React.FC = () => {
  const [filter, setFilter] = useState<'All' | 'High' | 'Medium' | 'Low'>('All');
  const [search, setSearch] = useState('');

  // Convert UTC HH:mm to EAT (UTC+3) HH:mm
  const toEAT = (utcTime: string) => {
    const [hours, minutes] = utcTime.split(':').map(Number);
    let eatHours = (hours + 3) % 24;
    return `${eatHours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
  };

  const filteredEvents = useMemo(() => {
    return MOCK_EVENTS.filter(e => {
      const matchesFilter = filter === 'All' || e.impact === filter;
      const matchesSearch = e.event.toLowerCase().includes(search.toLowerCase()) || 
                            e.currency.toLowerCase().includes(search.toLowerCase());
      return matchesFilter && matchesSearch;
    }).sort((a, b) => {
      // Sort by date then by time
      if (a.date !== b.date) return a.date.localeCompare(b.date);
      return a.time.localeCompare(b.time);
    });
  }, [filter, search]);

  // Group events by date
  const groupedEvents = useMemo(() => {
    const groups: Record<string, EconomicEvent[]> = {};
    filteredEvents.forEach(e => {
      if (!groups[e.date]) groups[e.date] = [];
      groups[e.date].push(e);
    });
    return groups;
  }, [filteredEvents]);

  const ImpactBadge = ({ level }: { level: string }) => {
    const colors = {
      High: 'bg-rose-500',
      Medium: 'bg-orange-500',
      Low: 'bg-slate-500'
    };
    const color = colors[level as keyof typeof colors];

    return (
      <div className="flex gap-1" title={`${level} Impact`}>
        <div className={`w-1.5 h-3 rounded-sm ${color}`} />
        <div className={`w-1.5 h-3 rounded-sm ${level === 'Low' ? 'bg-slate-800' : color}`} />
        <div className={`w-1.5 h-3 rounded-sm ${level === 'High' ? color : 'bg-slate-800'}`} />
      </div>
    );
  };

  const formatDateLabel = (dateStr: string) => {
    const d = new Date(dateStr);
    const options: Intl.DateTimeFormatOptions = { weekday: 'long', month: 'short', day: 'numeric' };
    const today = new Date().toISOString().split('T')[0];
    const prefix = dateStr === today ? 'TODAY, ' : '';
    return prefix + d.toLocaleDateString('en-US', options);
  };

  return (
    <div className="space-y-6 animate-fade-in p-2 md:p-4">
      {/* Header with EAT Timezone info */}
      <div className="bg-gradient-to-r from-slate-900 to-slate-800 p-6 rounded-[32px] text-white shadow-xl flex flex-col md:flex-row justify-between items-center gap-6 border border-slate-700">
        <div className="flex items-center gap-4">
          <div className="p-4 bg-blue-500/20 rounded-2xl backdrop-blur-md">
            <Calendar className="text-blue-400" size={24} />
          </div>
          <div>
            <h2 className="text-xl font-black uppercase tracking-tight">Weekly Economic Outlook</h2>
            <p className="text-sm text-slate-400 font-medium">
              Timezone: <span className="text-emerald-400">East Africa Time (UTC+3)</span>
            </p>
          </div>
        </div>
        <div className="flex bg-black/40 p-1.5 rounded-2xl backdrop-blur-md border border-slate-700">
          {(['All', 'High', 'Medium', 'Low'] as const).map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase transition-all ${
                filter === f ? 'bg-white text-slate-900 shadow-lg' : 'text-slate-400 hover:text-white'
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* Search Input */}
      <div className="relative group">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-trade-primary transition-colors" size={18} />
        <input 
          type="text"
          placeholder="Filter by event or currency (e.g. 'NFP', 'USD')..."
          className="w-full bg-trade-card border border-slate-800 rounded-2xl py-4 pl-12 pr-4 text-white focus:outline-none focus:ring-2 focus:ring-trade-primary/30 transition-all placeholder:text-slate-600 shadow-inner"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Calendar grouped by day */}
      <div className="space-y-4">
        {Object.keys(groupedEvents).length > 0 ? (
          // Fixed TypeScript error by adding an explicit cast to Object.entries return type
          (Object.entries(groupedEvents) as [string, EconomicEvent[]][]).map(([date, events]) => (
            <div key={date} className="bg-trade-card rounded-[32px] border border-slate-800 shadow-lg overflow-hidden">
              <div className="bg-slate-900/80 px-6 py-4 border-b border-slate-800 flex items-center justify-between">
                <h3 className="text-xs font-black text-trade-primary uppercase tracking-[0.2em] flex items-center gap-2">
                  <ChevronDown size={14} />
                  {formatDateLabel(date)}
                </h3>
                {/* Fixed TypeScript error by ensuring 'events' is typed correctly through casting above */}
                <span className="text-[10px] font-bold text-slate-500">{events.length} Events</span>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="text-[10px] font-black text-slate-600 uppercase tracking-widest border-b border-slate-800/50">
                      <th className="px-6 py-4">EAT Time</th>
                      <th className="px-6 py-4">Symbol</th>
                      <th className="px-6 py-4">Impact</th>
                      <th className="px-6 py-4">Event Description</th>
                      <th className="px-6 py-4 text-center">Actual</th>
                      <th className="px-6 py-4 text-center">Forecast</th>
                      <th className="px-6 py-4 text-center">Previous</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/30">
                    {/* Fixed TypeScript error by ensuring 'events' is typed correctly through casting above */}
                    {events.map((event) => {
                      const isBetter = event.actual && event.forecast && parseFloat(event.actual) > parseFloat(event.forecast);
                      const isWorse = event.actual && event.forecast && parseFloat(event.actual) < parseFloat(event.forecast);

                      return (
                        <tr key={event.id} className="hover:bg-slate-800/30 transition-colors group">
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-2 text-slate-300 font-mono text-sm">
                              <Clock size={14} className="text-slate-600" />
                              {toEAT(event.time)}
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <span className="text-xs font-black text-white bg-slate-800 px-2 py-1 rounded border border-slate-700">{event.currency}</span>
                          </td>
                          <td className="px-6 py-4">
                            <ImpactBadge level={event.impact} />
                          </td>
                          <td className="px-6 py-4">
                            <p className="text-sm font-bold text-slate-200 group-hover:text-trade-primary transition-colors truncate max-w-xs md:max-w-md">
                              {event.event}
                            </p>
                          </td>
                          <td className="px-6 py-4 text-center">
                            {event.actual ? (
                              <span className={`font-mono font-bold flex items-center justify-center gap-1 ${isBetter ? 'text-emerald-400' : isWorse ? 'text-rose-400' : 'text-white'}`}>
                                {event.actual}
                                {isBetter && <ArrowUpRight size={12} />}
                                {isWorse && <ArrowDownRight size={12} />}
                              </span>
                            ) : (
                              <Minus size={14} className="mx-auto text-slate-700" />
                            )}
                          </td>
                          <td className="px-6 py-4 text-center text-slate-500 font-mono text-xs">
                            {event.forecast || '-'}
                          </td>
                          <td className="px-6 py-4 text-center text-slate-500 font-mono text-xs">
                            {event.previous || '-'}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          ))
        ) : (
          <div className="bg-trade-card rounded-[40px] border border-slate-800 border-dashed py-20 text-center text-slate-600">
            <div className="flex flex-col items-center gap-4 opacity-30">
              <Calendar size={48} />
              <p className="font-bold uppercase tracking-widest text-sm">No scheduled events match your criteria</p>
            </div>
          </div>
        )}
      </div>

      {/* Educational Tips */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-slate-900/60 p-6 rounded-3xl border border-slate-800 flex gap-4">
           <div className="p-3 bg-blue-500/10 rounded-2xl h-fit">
             <Clock className="text-blue-500" size={20} />
           </div>
           <div>
              <h4 className="text-xs font-black text-white uppercase mb-2 tracking-widest">Timezone Synchronization</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                The times displayed above are converted to <span className="text-emerald-400 font-bold">East Africa Time (EAT)</span>. This helps you plan your trades according to local time in Ethiopia and surrounding regions.
              </p>
           </div>
        </div>
        <div className="bg-slate-900/60 p-6 rounded-3xl border border-slate-800 flex gap-4">
           <div className="p-3 bg-rose-500/10 rounded-2xl h-fit">
             <AlertTriangle className="text-rose-500" size={20} />
           </div>
           <div>
              <h4 className="text-xs font-black text-white uppercase mb-2 tracking-widest">Red Impact Strategy</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                High impact events (NFP, Interest Rates) can move pairs like EUR/USD or XAU/USD by hundreds of pips in seconds. Protect your capital by trailing your stop-loss or going flat before the release.
              </p>
           </div>
        </div>
      </div>
    </div>
  );
};
