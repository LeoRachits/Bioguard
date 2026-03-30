export default function StatusBadge ({ status }) {
    const styles = {
        'pendente': 'bg-yellow-100 text-yellow-800 border-yellow-200',
        'em andamento': 'bg-blue-100 text-blue-800 border-blue-200',
        'resolvido': 'bg-green-100 text-green-800 border-green-200'
    }

    return (
        <span className={`px-3 py-1 rounded-full text-xs font-bold border ${styles[status.toLowerCase()]}`}>
            {status.toUpperCase()}
        </span>
    )
}