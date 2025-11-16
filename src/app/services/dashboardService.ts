// import { usuariosService } from "./usuariosService";
// import { carregarPosts, Post } from "./blogService";

// export interface DashboardStats {
//     totalUsers: number;
//     totalPosts: number;
//     activeUsers: number;
//     blockedUsers: number;
//     recentPosts: Post[];
//     usersGrowth: string;
//     postsGrowth: string;
// }

// export interface GrowthDataPoint {
//     date: string;
//     users: number;
// }

// type PeriodFilter = "7d" | "30d" | "6m" | "1y";

// export const dashboardService = {
//     /**
//      * Busca todas as estatísticas do dashboard
//      */
//     async getStats(): Promise<DashboardStats> {
//         try {
//             // Busca dados em paralelo para melhor performance
//             const [usersResponse, posts] = await Promise.all([
//                 usuariosService.listUsers(1, 1000), // Busca todos os usuários (ajuste o pageSize conforme necessário)
//                 carregarPosts(),
//             ]);

//             // Calcula estatísticas dos usuários
//             const activeUsers = usersResponse.users.filter(user => !user.blocked).length;
//             const blockedUsers = usersResponse.users.filter(user => user.blocked).length;

//             // Pega os posts mais recentes (últimos 5)
//             const recentPosts = posts
//                 .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
//                 .slice(0, 5);

//             // Calcula crescimento (exemplo: comparando com mês anterior)
//             // Você pode ajustar essa lógica conforme sua necessidade
//             const usersGrowth = "+12.5%"; // Implementar lógica real se tiver dados históricos
//             const postsGrowth = "+8.3%"; // Implementar lógica real se tiver dados históricos

//             return {
//                 totalUsers: usersResponse.pagination.total,
//                 totalPosts: posts.length,
//                 activeUsers,
//                 blockedUsers,
//                 recentPosts,
//                 usersGrowth,
//                 postsGrowth,
//             };
//         } catch (error) {
//             console.error("Erro ao buscar estatísticas do dashboard:", error);
//             throw error;
//         }
//     },

//     /**
//      * Busca dados de crescimento de usuários por período
//      */
//     async getUsersGrowthData(period: PeriodFilter): Promise<GrowthDataPoint[]> {
//         try {
//             // Busca todos os usuários
//             const usersResponse = await usuariosService.listUsers(1, 1000);
//             const users = usersResponse.users;

//             // Define a data inicial baseada no período
//             const now = new Date();
//             const startDate = new Date();
//             let groupBy: "day" | "week" | "month" = "day";

//             switch (period) {
//                 case "7d":
//                     startDate.setDate(now.getDate() - 7);
//                     groupBy = "day";
//                     break;
//                 case "30d":
//                     startDate.setDate(now.getDate() - 30);
//                     groupBy = "day";
//                     break;
//                 case "6m":
//                     startDate.setMonth(now.getMonth() - 6);
//                     groupBy = "week";
//                     break;
//                 case "1y":
//                     startDate.setFullYear(now.getFullYear() - 1);
//                     groupBy = "month";
//                     break;
//             }

//             // Filtra usuários criados após a data inicial
//             const filteredUsers = users.filter(user => {
//                 const createdAt = new Date(user.createdAt);
//                 return createdAt >= startDate;
//             });

//             // Agrupa usuários por período
//             const grouped = this.groupUsersByPeriod(filteredUsers, groupBy, startDate, now);

//             return grouped;
//         } catch (error) {
//             console.error("Erro ao buscar dados de crescimento:", error);
//             throw error;
//         }
//     },

//     /**
//      * Agrupa usuários por período (dia, semana ou mês)
//      */
//     groupUsersByPeriod(
//         users: { createdAt: string }[],
//         groupBy: "day" | "week" | "month",
//         startDate: Date,
//         endDate: Date
//     ): GrowthDataPoint[] {
//         const result: { [key: string]: number } = {};

//         // Inicializa todos os períodos com 0
//         const current = new Date(startDate);
//         while (current <= endDate) {
//             const key = this.getDateKey(current, groupBy);
//             result[key] = 0;

//             // Avança para o próximo período
//             if (groupBy === "day") {
//                 current.setDate(current.getDate() + 1);
//             } else if (groupBy === "week") {
//                 current.setDate(current.getDate() + 7);
//             } else {
//                 current.setMonth(current.getMonth() + 1);
//             }
//         }

//         // Conta usuários em cada período
//         users.forEach(user => {
//             const createdAt = new Date(user.createdAt);
//             const key = this.getDateKey(createdAt, groupBy);
//             if (result.hasOwnProperty(key)) {
//                 result[key]++;
//             }
//         });

//         // Converte para array e formata
//         return Object.entries(result)
//             .map(([date, users]) => ({ date, users }))
//             .sort((a, b) => {
//                 const dateA = this.parseDate(a.date, groupBy);
//                 const dateB = this.parseDate(b.date, groupBy);
//                 return dateA.getTime() - dateB.getTime();
//             });
//     },

//     /**
//      * Gera a chave de data baseada no tipo de agrupamento
//      */
//     getDateKey(date: Date, groupBy: "day" | "week" | "month"): string {
//         if (groupBy === "day") {
//             return `${date.getDate().toString().padStart(2, '0')}/${(date.getMonth() + 1).toString().padStart(2, '0')}`;
//         } else if (groupBy === "week") {
//             // Retorna o início da semana
//             const weekStart = new Date(date);
//             weekStart.setDate(date.getDate() - date.getDay());
//             return `${weekStart.getDate().toString().padStart(2, '0')}/${(weekStart.getMonth() + 1).toString().padStart(2, '0')}`;
//         } else {
//             // Mês
//             const monthNames = ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"];
//             return monthNames[date.getMonth()];
//         }
//     },

//     /**
//      * Converte string de data de volta para objeto Date
//      */
//     parseDate(dateStr: string, groupBy: "day" | "week" | "month"): Date {
//         if (groupBy === "month") {
//             const monthNames = ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"];
//             const monthIndex = monthNames.indexOf(dateStr);
//             const year = new Date().getFullYear();
//             return new Date(year, monthIndex, 1);
//         } else {
//             // Para dia e semana (formato DD/MM)
//             const [day, month] = dateStr.split('/').map(Number);
//             const year = new Date().getFullYear();
//             return new Date(year, month - 1, day);
//         }
//     },

//     /**
//      * Busca dados de crescimento mensal (se sua API fornecer)
//      */
//     async getMonthlyGrowth(): Promise<{ month: string; users: number; posts: number }[]> {
//         // Se você tiver um endpoint específico para isso, use-o aqui
//         // Por enquanto, retorna dados mockados
//         // TODO: Implementar quando houver endpoint específico
//         return [
//             { month: "Jan", users: 180, posts: 12 },
//             { month: "Fev", users: 220, posts: 15 },
//             { month: "Mar", users: 195, posts: 11 },
//             { month: "Abr", users: 280, posts: 18 },
//             { month: "Mai", users: 240, posts: 14 },
//             { month: "Jun", users: 310, posts: 20 },
//         ];
//     },
// };