import { useEffect } from "react";

interface LoginAccessModalProps {
    open: boolean;
    onClose: () => void;
}

export default function LoginAccessModal({
    open,
    onClose,
}: LoginAccessModalProps) {
    useEffect(() => {
        if (!open) return;

        const onKeyDown = (event: KeyboardEvent) => {
            if (event.key === "Escape") onClose();
        };

        window.addEventListener("keydown", onKeyDown);
        return () => window.removeEventListener("keydown", onKeyDown);
    }, [open, onClose]);

    if (!open) return null;

    return (
        <div
            className="fixed inset-0 z-[100] flex items-center justify-center px-5"
            style={{ background: "rgba(7, 15, 35, 0.58)" }}
            onMouseDown={onClose}
        >
            <div
                className="w-full max-w-[460px] rounded-3xl p-7 shadow-2xl theme-transition"
                style={{
                    background: "var(--bg-1)",
                    border: "1px solid var(--border)",
                }}
                onMouseDown={(event) => event.stopPropagation()}
                role="dialog"
                aria-modal="true"
                aria-labelledby="login-access-title"
            >
                <div className="flex items-start justify-between gap-4">
                    <div>
                        <p
                            className="text-xs font-semibold tracking-[0.18em] uppercase"
                            style={{ color: "var(--blue)" }}
                        >
                            Hominode Access
                        </p>

                        <h2
                            id="login-access-title"
                            className="mt-2 text-2xl font-bold"
                            style={{ color: "var(--text-1)" }}
                        >
                            Choose how you want to sign in
                        </h2>

                        <p
                            className="mt-2 text-sm leading-6"
                            style={{ color: "var(--text-2)" }}
                        >
                            Select the portal that matches your account.
                        </p>
                    </div>

                    <button
                        type="button"
                        aria-label="Close"
                        onClick={onClose}
                        className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full text-lg"
                        style={{
                            color: "var(--text-2)",
                            background: "var(--bg-3)",
                        }}
                    >
                        ×
                    </button>
                </div>

                <div className="mt-7 grid gap-3">
                    <button
                        type="button"
                        onClick={() => {
                            window.location.href = "/resident";
                        }}
                        className="w-full rounded-2xl p-5 text-left transition-all hover:-translate-y-0.5"
                        style={{
                            background: "var(--blue-bg)",
                            border: "1px solid var(--blue)",
                        }}
                    >
                        <div
                            className="text-base font-bold"
                            style={{ color: "var(--text-1)" }}
                        >
                            Resident
                        </div>

                        <div
                            className="mt-1 text-sm"
                            style={{ color: "var(--text-2)" }}
                        >
                            Access your community resident portal
                        </div>
                    </button>

                    <button
                        type="button"
                        onClick={() => {
                            window.location.href = "https://admin.hominode.com/";
                        }}
                        className="w-full rounded-2xl p-5 text-left transition-all hover:-translate-y-0.5"
                        style={{
                            background: "var(--bg-2)",
                            border: "1px solid var(--border)",
                        }}
                    >
                        <div
                            className="text-base font-bold"
                            style={{ color: "var(--text-1)" }}
                        >
                            Administrator
                        </div>

                        <div
                            className="mt-1 text-sm"
                            style={{ color: "var(--text-2)" }}
                        >
                            Manage your community
                        </div>
                    </button>
                </div>
            </div>
        </div>
    );
}