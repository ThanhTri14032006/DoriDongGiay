using DoriDongGiay.Models;

namespace DoriDongGiay.Services.Interfaces
{
    public interface IAuthService
    {
        Task<User> GetCurrentUserAsync();
        Task<List<User>> GetAllUsersAsync();
        Task<bool> IsUserInRoleAsync(string userId, string role);
    }
}