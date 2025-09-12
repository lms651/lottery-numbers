import powerBallLogo from "../images/powerball.jpg"

export default function Header() {
    return (
        <header>
            <img className="logo" src={ powerBallLogo } alt="Powerball logo" />
            <span className="title">NUMBER GENERATOR</span>
        </header>
    )
}