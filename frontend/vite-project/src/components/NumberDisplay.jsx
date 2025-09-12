import Number from "./Number"

export default function NumberDisplay() {
    return (
        <main>
            <div className="number-display">
                <div className="row">
                    <Number value={12} />
                    <Number value={34} />
                    <Number value={56} />
                </div>
                <div className="row">
                    <Number value={23} />
                    <Number value={45} />
                </div>
                <div className="row">
                    <Number value={10} isRed />
                </div>
            </div>
        </main>
    )
}