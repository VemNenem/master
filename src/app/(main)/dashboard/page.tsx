"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Users, FileText, UserCheck, UserX, Loader2 } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { dashboardService, DashboardStats, GrowthDataPoint } from "../../services/dashboardService";

interface StatCard {
    title: string;
    value: string | number;
    change: string;
    trend: "up" | "down";
    icon: React.ElementType;
}

type PeriodFilter = "7d" | "30d" | "6m" | "1y";

export default function Dashboard() {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [stats, setStats] = useState<DashboardStats | null>(null);
    const [statCards, setStatCards] = useState<StatCard[]>([]);
    const [growthData, setGrowthData] = useState<GrowthDataPoint[]>([]);
    const [selectedPeriod, setSelectedPeriod] = useState<PeriodFilter>("30d");
    const [loadingChart, setLoadingChart] = useState(false);

    useEffect(() => {
        loadDashboardData();
    }, []);

    useEffect(() => {
        if (stats) {
            loadGrowthData();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedPeriod, stats]);

    const loadDashboardData = async () => {
        try {
            setLoading(true);
            setError(null);

            const data = await dashboardService.getStats();
            setStats(data);

            setStatCards([
                {
                    title: "Total de Usuários",
                    value: data.totalUsers.toLocaleString('pt-BR'),
                    change: "",
                    trend: "up",
                    icon: Users,
                },
                {
                    title: "Usuários Ativos",
                    value: data.activeUsers.toLocaleString('pt-BR'),
                    change: "",
                    trend: "up",
                    icon: UserCheck,
                },
                {
                    title: "Usuários Inativos",
                    value: data.blockedUsers.toLocaleString('pt-BR'),
                    change: "",
                    trend: "up",
                    icon: UserX,
                },
                {
                    title: "Artigos Publicados",
                    value: data.totalPosts.toLocaleString('pt-BR'),
                    change: "",
                    trend: "up",
                    icon: FileText,
                },
            ]);
        } catch (err) {
            setError(err instanceof Error ? err.message : "Erro ao carregar dados");
            console.error("Erro ao carregar dashboard:", err);
        } finally {
            setLoading(false);
        }
    };

    const loadGrowthData = async () => {
        try {
            setLoadingChart(true);
            const data = await dashboardService.getUsersGrowthData(selectedPeriod);
            setGrowthData(data);
        } catch (err) {
            console.error("Erro ao carregar dados de crescimento:", err);
        } finally {
            setLoadingChart(false);
        }
    };

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        const now = new Date();
        const diffInMs = now.getTime() - date.getTime();
        const diffInMinutes = Math.floor(diffInMs / (1000 * 60));
        const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
        const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

        if (diffInMinutes < 60) {
            return `${diffInMinutes} min atrás`;
        } else if (diffInHours < 24) {
            return `${diffInHours}h atrás`;
        } else if (diffInDays === 1) {
            return "1 dia atrás";
        } else if (diffInDays < 7) {
            return `${diffInDays} dias atrás`;
        } else {
            return date.toLocaleDateString('pt-BR');
        }
    };

    const getPeriodLabel = (period: PeriodFilter) => {
        const labels = {
            "7d": "Últimos 7 dias",
            "30d": "Últimos 30 dias",
            "6m": "Últimos 6 meses",
            "1y": "Último ano"
        };
        return labels[period];
    };

    return (
        <main style={style.container}>
            <section style={style.content}>
                <h2 style={style.title}>Dashboard</h2>

                {error && (
                    <div style={style.errorMessage}>
                        {error}
                        <button onClick={loadDashboardData} style={style.retryButton}>
                            Tentar novamente
                        </button>
                    </div>
                )}

                {loading ? (
                    <div style={style.loadingContainer}>
                        <Loader2 size={40} style={{ animation: "spin 1s linear infinite" }} />
                        <p>Carregando dados...</p>
                    </div>
                ) : stats ? (
                    <>
                        {/* Cards de Estatísticas */}
                        <div style={style.statsGrid}>
                            {statCards.map((stat, index) => {
                                const Icon = stat.icon;

                                return (
                                    <div key={index} style={style.statCard}>
                                        <div style={style.statHeader}>
                                            <div style={style.iconContainer}>
                                                <Icon size={24} color="white" />
                                            </div>
                                        </div>
                                        <h3 style={style.statTitle}>{stat.title}</h3>
                                        <p style={style.statValue}>{stat.value}</p>
                                    </div>
                                );
                            })}
                        </div>

                        {/* Gráfico de Crescimento de Usuários */}
                        <div style={style.chartCard}>
                            <div style={style.chartHeader}>
                                <h3 style={style.chartTitle}>Crescimento de Cadastros</h3>
                                <div style={style.periodFilters}>
                                    {(["7d", "30d", "6m", "1y"] as PeriodFilter[]).map((period) => (
                                        <button
                                            key={period}
                                            onClick={() => setSelectedPeriod(period)}
                                            style={{
                                                ...style.periodButton,
                                                ...(selectedPeriod === period ? style.periodButtonActive : {})
                                            }}
                                        >
                                            {getPeriodLabel(period)}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {loadingChart ? (
                                <div style={style.chartLoading}>
                                    <Loader2 size={30} style={{ animation: "spin 1s linear infinite" }} />
                                </div>
                            ) : (
                                <ResponsiveContainer width="100%" height={300}>
                                    <LineChart data={growthData}>
                                        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                                        <XAxis
                                            dataKey="date"
                                            stroke="#999"
                                            style={{ fontSize: '12px' }}
                                        />
                                        <YAxis
                                            stroke="#999"
                                            style={{ fontSize: '12px' }}
                                        />
                                        <Tooltip
                                            contentStyle={{
                                                backgroundColor: 'white',
                                                border: '1px solid #e0e0e0',
                                                borderRadius: '8px',
                                                padding: '10px'
                                            }}
                                            labelStyle={{ color: '#333', fontWeight: 'bold' }}
                                        />
                                        <Line
                                            type="monotone"
                                            dataKey="users"
                                            stroke="#42CFEA"
                                            strokeWidth={2}
                                            dot={{ fill: '#42CFEA', r: 4 }}
                                            activeDot={{ r: 6 }}
                                            name="Novos Cadastros"
                                        />
                                    </LineChart>
                                </ResponsiveContainer>
                            )}
                        </div>

                        {/* Resumo e Posts Recentes */}
                        <div style={style.chartsContainer}>
                            {/* Resumo Geral */}
                            <div style={style.summaryCard}>
                                <h3 style={style.chartTitle}>Resumo Geral</h3>
                                <div style={style.summaryContainer}>
                                    <div style={style.summaryItem}>
                                        <div style={style.summaryLabel}>Taxa de Usuários Ativos</div>
                                        <div style={style.progressBar}>
                                            <div
                                                style={{
                                                    ...style.progressFill,
                                                    width: `${(stats.activeUsers / stats.totalUsers) * 100}%`
                                                }}
                                            />
                                        </div>
                                        <div style={style.summaryValue}>
                                            {((stats.activeUsers / stats.totalUsers) * 100).toFixed(1)}%
                                        </div>
                                    </div>

                                    <div style={style.summaryItem}>
                                        <div style={style.summaryLabel}>Taxa de Usuários Inativos</div>
                                        <div style={style.progressBar}>
                                            <div
                                                style={{
                                                    ...style.progressFill,
                                                    width: `${(stats.blockedUsers / stats.totalUsers) * 100}%`,
                                                    backgroundColor: '#ff6b6b',
                                                }}
                                            />
                                        </div>
                                        <div style={style.summaryValue}>
                                            {((stats.blockedUsers / stats.totalUsers) * 100).toFixed(1)}%
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Posts Recentes */}
                            <div style={style.activityCard}>
                                <h3 style={style.chartTitle}>Artigos Recentes</h3>
                                <div className="scroll-box" style={style.activityList}>
                                    {stats.recentPosts.length === 0 ? (
                                        <div style={style.emptyState}>
                                            <p>Nenhum artigo publicado ainda</p>
                                        </div>
                                    ) : (
                                        stats.recentPosts.map((post) => {
                                            const imageUrl = post.image?.url
                                                ? `https://api.vemnenem.app.br${post.image.url}`
                                                : null;

                                            return (
                                                <div key={post.documentId} style={style.activityItem}>
                                                    {imageUrl ? (
                                                        <Image
                                                            src={imageUrl}
                                                            alt={post.image?.alternativeText || post.title}
                                                            width={60}
                                                            height={60}
                                                            style={style.postImage}
                                                            onError={(e) => {
                                                                e.currentTarget.style.display = 'none';
                                                                if (e.currentTarget.nextSibling) {
                                                                    (e.currentTarget.nextSibling as HTMLElement).style.display = 'flex';
                                                                }
                                                            }}
                                                        />
                                                    ) : null}
                                                    <div
                                                        style={{
                                                            ...style.postImagePlaceholder,
                                                            display: imageUrl ? 'none' : 'flex'
                                                        }}
                                                    >
                                                        <FileText size={20} color="#42CFEA" />
                                                    </div>
                                                    <div style={style.activityContent}>
                                                        <p style={style.postTitle}>{post.title}</p>
                                                        <p style={style.postAuthor}>Por {post.author}</p>
                                                        <p style={style.activityTime}>{formatDate(post.createdAt)}</p>
                                                    </div>
                                                </div>
                                            );
                                        })
                                    )}
                                </div>
                            </div>
                        </div>
                    </>
                ) : null}
            </section>
        </main>
    );
}

const style = {
    container: {
        display: "flex",
        minHeight: "100vh",
        fontFamily: "Arial, sans-serif",
        backgroundColor: "#F9F9F9",
        overflow: "hidden",
    },
    content: {
        flex: 1,
        padding: "40px 40px",
        color: "#707070",
        height: "100vh",
        overflowY: "auto",
        scrollbarWidth: "none",
        msOverflowStyle: "none",
    },
    title: {
        fontSize: "22px",
        fontWeight: "bold" as const,
        marginBottom: "30px",
        color: "#707070",
    },
    errorMessage: {
        backgroundColor: "#fee",
        color: "#c33",
        padding: "12px 20px",
        borderRadius: "8px",
        marginBottom: "20px",
        border: "1px solid #fcc",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
    },
    retryButton: {
        background: "#c33",
        color: "white",
        border: "none",
        padding: "6px 12px",
        borderRadius: "4px",
        cursor: "pointer",
        fontSize: "12px",
    },
    loadingContainer: {
        display: "flex",
        flexDirection: "column" as const,
        alignItems: "center",
        justifyContent: "center",
        padding: "60px 20px",
        color: "#00c5b5",
    },
    statsGrid: {
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
        gap: "20px",
        marginBottom: "30px",
    },
    statCard: {
        backgroundColor: "white",
        borderRadius: "14px",
        boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
        padding: "20px",
        transition: "transform 0.2s ease, box-shadow 0.2s ease",
    },
    statHeader: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: "15px",
    },
    iconContainer: {
        width: "48px",
        height: "48px",
        borderRadius: "12px",
        backgroundColor: "#42CFEA",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    },
    statTitle: {
        fontSize: "14px",
        color: "#999",
        marginBottom: "8px",
        fontWeight: "normal" as const,
    },
    statValue: {
        fontSize: "28px",
        fontWeight: "bold" as const,
        color: "#333",
        margin: 0,
    },
    chartCard: {
        backgroundColor: "white",
        borderRadius: "14px",
        boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
        padding: "25px",
        marginBottom: "30px",
    },
    chartHeader: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: "20px",
        flexWrap: "wrap" as const,
        gap: "15px",
    },
    chartTitle: {
        fontSize: "18px",
        fontWeight: "bold" as const,
        color: "#333",
        margin: 0,
    },
    periodFilters: {
        display: "flex",
        gap: "8px",
        flexWrap: "wrap" as const,
    },
    periodButton: {
        padding: "8px 16px",
        border: "1px solid #e0e0e0",
        borderRadius: "8px",
        backgroundColor: "white",
        color: "#707070",
        fontSize: "13px",
        cursor: "pointer",
        transition: "all 0.2s ease",
        fontWeight: "500" as const,
    },
    periodButtonActive: {
        backgroundColor: "#42CFEA",
        color: "white",
        borderColor: "#42CFEA",
    },
    chartLoading: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "300px",
        color: "#00c5b5",
    },
    chartsContainer: {
        display: "grid",
        gridTemplateColumns: "1.5fr 1fr",
        gap: "20px",
    },
    summaryCard: {
        backgroundColor: "white",
        borderRadius: "14px",
        boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
        padding: "25px",
    },
    summaryContainer: {
        display: "flex",
        flexDirection: "column" as const,
        gap: "25px",
    },
    summaryItem: {
        display: "flex",
        flexDirection: "column" as const,
        gap: "8px",
    },
    summaryLabel: {
        fontSize: "14px",
        color: "#707070",
        fontWeight: "500" as const,
    },
    progressBar: {
        width: "100%",
        height: "12px",
        backgroundColor: "#f0f0f0",
        borderRadius: "6px",
        overflow: "hidden",
    },
    progressFill: {
        height: "100%",
        backgroundColor: "#42CFEA",
        transition: "width 0.5s ease",
        borderRadius: "6px",
    },
    summaryValue: {
        fontSize: "16px",
        fontWeight: "bold" as const,
        color: "#333",
    },
    activityCard: {
        backgroundColor: "white",
        borderRadius: "14px",
        boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
        padding: "25px",
        display: "flex",
        flexDirection: "column" as const,
    },
    activityList: {
        display: "flex",
        flexDirection: "column" as const,
        gap: "15px",
        flex: 1,
    },
    activityItem: {
        display: "flex",
        gap: "12px",
        alignItems: "flex-start",
    },
    postImage: {
        width: "50px",
        height: "50px",
        borderRadius: "8px",
        objectFit: "cover" as const,
        flexShrink: 0,
    },
    postImagePlaceholder: {
        width: "50px",
        height: "50px",
        borderRadius: "8px",
        backgroundColor: "#e3f2fd",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexShrink: 0,
    },
    activityContent: {
        flex: 1,
        minWidth: 0,
    },
    postTitle: {
        fontSize: "14px",
        fontWeight: "600" as const,
        color: "#333",
        margin: "0 0 4px 0",
        overflow: "hidden",
        textOverflow: "ellipsis",
        whiteSpace: "nowrap" as const,
    },
    postAuthor: {
        fontSize: "13px",
        color: "#707070",
        margin: "0 0 4px 0",
    },
    activityTime: {
        fontSize: "12px",
        color: "#999",
        margin: 0,
    },
    emptyState: {
        textAlign: "center" as const,
        padding: "40px 20px",
        color: "#999",
    },
} as const;