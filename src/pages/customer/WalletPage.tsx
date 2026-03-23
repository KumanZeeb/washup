import { Wallet, ArrowUpRight, ArrowDownLeft } from "lucide-react";

const transactions = [
  { id: "1", type: "credit", label: "Top Up", amount: 100000, date: "23 Feb 2026" },
  { id: "2", type: "debit", label: "Pembayaran #WU-1234", amount: -24500, date: "23 Feb 2026" },
  { id: "3", type: "credit", label: "Cashback Promo", amount: 5000, date: "22 Feb 2026" },
  { id: "4", type: "debit", label: "Pembayaran #WU-1230", amount: -35000, date: "20 Feb 2026" },
];

export default function WalletPage() {
  return (
    <div className="space-y-5 animate-fade-in">
      <h2 className="text-lg font-bold">Dompet</h2>

      <div className="gradient-primary rounded-2xl p-5 text-primary-foreground">
        <div className="flex items-center gap-2 text-sm opacity-80"><Wallet className="h-4 w-4" /> Saldo Anda</div>
        <p className="mt-1 text-3xl font-extrabold">Rp 150.000</p>
      </div>

      <div>
        <h3 className="text-sm font-semibold mb-3">Riwayat Transaksi</h3>
        <div className="space-y-2">
          {transactions.map((t) => (
            <div key={t.id} className="flex items-center justify-between rounded-xl border bg-card p-3.5 shadow-soft">
              <div className="flex items-center gap-3">
                <div className={`rounded-lg p-2 ${t.type === "credit" ? "bg-success/10" : "bg-destructive/10"}`}>
                  {t.type === "credit" ? <ArrowDownLeft className="h-4 w-4 text-success" /> : <ArrowUpRight className="h-4 w-4 text-destructive" />}
                </div>
                <div>
                  <p className="text-sm font-medium">{t.label}</p>
                  <p className="text-xs text-muted-foreground">{t.date}</p>
                </div>
              </div>
              <span className={`text-sm font-bold ${t.amount >= 0 ? "text-success" : "text-destructive"}`}>
                {t.amount >= 0 ? "+" : ""}Rp {Math.abs(t.amount).toLocaleString("id-ID")}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
