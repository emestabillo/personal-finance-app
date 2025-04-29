import Link from "next/link";

export default function Menu() {
  return (
    <header>
      <Link href="/">Overview</Link>
      <Link href="/transactions">Transactions</Link>
      <Link href="/budgets">Budgets</Link>
      <Link href="/pots">Pots</Link>
      <Link href="/recurring-bills">Recurring Bills</Link>
    </header>
  );
}
