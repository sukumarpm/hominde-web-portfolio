import { useState, type FormEvent } from "react";

export default function ResidentAccess() {
    const [community, setCommunity] = useState("");
    const [error, setError] = useState("");

    function submit(event: FormEvent) {
        event.preventDefault();

        const slug = community
            .trim()
            .toLowerCase()
            .replace(/\s+/g, "-")
            .replace(/[^a-z0-9-]/g, "")
            .replace(/-+/g, "-")
            .replace(/^-|-$/g, "");

        if (!slug) {
            setError("Enter your community code.");
            return;
        }

        window.location.assign(`/${slug}/`);
    }

    return (
        <main
            className="relative min-h-screen overflow-hidden flex items-center justify-center px-5 py-12 theme-transition"
            style={{
                background:
                    "radial-gradient(circle at 18% 18%, rgba(37,99,235,0.10), transparent 32%), radial-gradient(circle at 82% 12%, rgba(99,102,241,0.08), transparent 30%), var(--bg-1)",
            }}
        >
            <div
                aria-hidden="true"
                className="absolute inset-0 pointer-events-none"
                style={{
                    backgroundImage:
                        "radial-gradient(rgba(37,99,235,0.10) 1px, transparent 1px)",
                    backgroundSize: "28px 28px",
                    maskImage:
                        "linear-gradient(to bottom, rgba(0,0,0,0.28), transparent 75%)",
                }}
            />
            <section
                className="relative z-10 w-full max-w-[480px] rounded-3xl p-8 shadow-xl"
                style={{
                    background: "var(--bg-1)",
                    border: "1px solid var(--border)",
                }}
            >
                <a href="/" className="inline-flex items-center gap-3">
                    <img
                        src="/logo.png"
                        alt="Hominode"
                        className="h-10 w-10 object-contain"
                    />
                    <strong
                        className="text-lg"
                        style={{ color: "var(--text-1)" }}
                    >
                        HOMINODE
                    </strong>
                </a>

                <p
                    className="mt-8 text-xs font-semibold uppercase tracking-[0.18em]"
                    style={{ color: "var(--blue)" }}
                >
                    Resident Portal
                </p>

                <h1
                    className="mt-2 text-3xl font-bold"
                    style={{ color: "var(--text-1)" }}
                >
                    Find your community
                </h1>

                <p
                    className="mt-3 text-sm leading-6"
                    style={{ color: "var(--text-2)" }}
                >
                    Enter the community code provided by your community management.
                </p>

                <form onSubmit={submit} className="mt-7">
                    <label
                        htmlFor="community-code"
                        className="text-sm font-semibold"
                        style={{ color: "var(--text-1)" }}
                    >
                        Community code
                    </label>

                    <input
                        id="community-code"
                        value={community}
                        onChange={(event) => {
                            setCommunity(event.target.value);
                            if (error) setError("");
                        }}
                        placeholder="e.g. blue-valley"
                        autoComplete="off"
                        className="mt-2 w-full rounded-xl px-4 py-3 outline-none"
                        style={{
                            color: "var(--text-1)",
                            background: "var(--bg-1)",
                            border: "1px solid var(--border)",
                        }}
                    />

                    {error && (
                        <p className="mt-2 text-sm text-red-600">{error}</p>
                    )}

                    <button
                        type="submit"
                        className="btn-primary mt-5 w-full rounded-xl px-5 py-3 font-semibold text-white"
                    >
                        Continue
                    </button>
                </form>

                <a
                    href="/"
                    className="mt-6 block text-center text-sm"
                    style={{ color: "var(--text-2)" }}
                >
                    ← Back to Hominode
                </a>
            </section>
        </main>
    );
}