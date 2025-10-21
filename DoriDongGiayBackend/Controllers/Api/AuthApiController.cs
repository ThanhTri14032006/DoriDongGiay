using DoriDongGiay.Models;
using DoriDongGiay.Models.ViewModels;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace DoriDongGiay.Controllers.Api
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthApiController : ControllerBase
    {
        private readonly UserManager<User> _userManager;
        private readonly SignInManager<User> _signInManager;

        public AuthApiController(UserManager<User> userManager, SignInManager<User> signInManager)
        {
            _userManager = userManager;
            _signInManager = signInManager;
        }

        [HttpPost("login")]
        public async Task<ActionResult<object>> Login(LoginModel model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var result = await _signInManager.PasswordSignInAsync(model.Email, model.Password, 
                model.RememberMe, lockoutOnFailure: false);
            
            if (result.Succeeded)
            {
                var user = await _userManager.FindByEmailAsync(model.Email);
                return Ok(new { 
                    success = true, 
                    message = "Đăng nhập thành công",
                    user = new {
                        id = user.Id,
                        email = user.Email,
                        fullName = user.FullName,
                        phone = user.PhoneNumber
                    }
                });
            }
            else
            {
                return BadRequest(new { 
                    success = false, 
                    message = "Email hoặc mật khẩu không đúng." 
                });
            }
        }

        [HttpPost("register")]
        public async Task<ActionResult<object>> Register(RegisterModel model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var user = new User 
            { 
                UserName = model.Email, 
                Email = model.Email,
                FullName = model.FullName,
                PhoneNumber = model.Phone
            };

            var result = await _userManager.CreateAsync(user, model.Password);

            if (result.Succeeded)
            {
                await _signInManager.SignInAsync(user, isPersistent: false);
                return Ok(new { 
                    success = true, 
                    message = "Đăng ký thành công",
                    user = new {
                        id = user.Id,
                        email = user.Email,
                        fullName = user.FullName,
                        phone = user.PhoneNumber
                    }
                });
            }

            return BadRequest(new { 
                success = false, 
                message = "Đăng ký thất bại",
                errors = result.Errors.Select(e => e.Description)
            });
        }

        [HttpPost("logout")]
        public async Task<ActionResult<object>> Logout()
        {
            await _signInManager.SignOutAsync();
            return Ok(new { 
                success = true, 
                message = "Đăng xuất thành công" 
            });
        }

        [HttpGet("user")]
        public async Task<ActionResult<object>> GetCurrentUser()
        {
            if (!User.Identity.IsAuthenticated)
            {
                return Unauthorized(new { success = false, message = "Chưa đăng nhập" });
            }

            var user = await _userManager.GetUserAsync(User);
            if (user == null)
            {
                return NotFound(new { success = false, message = "Không tìm thấy người dùng" });
            }

            return Ok(new { 
                success = true,
                user = new {
                    id = user.Id,
                    email = user.Email,
                    fullName = user.FullName,
                    phone = user.PhoneNumber
                }
            });
        }
    }
}
