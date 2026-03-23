import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { EmptyState } from "./EmptyState";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useState } from "react";

export interface Column<T> {
  key: string;
  header: string;
  render?: (row: T) => React.ReactNode;
  className?: string;
}

interface DataTableProps<T> {
  columns: Column<T>[];
  data: T[];
  searchable?: boolean;
  searchKeys?: string[];
  emptyTitle?: string;
  emptyDescription?: string;
}

export function DataTable<T extends Record<string, unknown>>({
  columns, data, searchable = false, searchKeys = [], emptyTitle = "Tidak ada data", emptyDescription,
}: DataTableProps<T>) {
  const [search, setSearch] = useState("");

  const filtered = searchable && search
    ? data.filter((row) =>
        searchKeys.some((key) =>
          String(row[key] ?? "").toLowerCase().includes(search.toLowerCase())
        )
      )
    : data;

  return (
    <div className="space-y-3">
      {searchable && (
        <div className="relative max-w-sm">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input placeholder="Cari..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-9" />
        </div>
      )}
      {filtered.length === 0 ? (
        <EmptyState title={emptyTitle} description={emptyDescription} />
      ) : (
        <div className="rounded-lg border bg-card shadow-soft overflow-auto">
          <Table>
            <TableHeader>
              <TableRow>
                {columns.map((col) => (
                  <TableHead key={col.key} className={col.className}>{col.header}</TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((row, i) => (
                <TableRow key={i} className="hover:bg-muted/50 transition-colors">
                  {columns.map((col) => (
                    <TableCell key={col.key} className={col.className}>
                      {col.render ? col.render(row) : String(row[col.key] ?? "")}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
}
