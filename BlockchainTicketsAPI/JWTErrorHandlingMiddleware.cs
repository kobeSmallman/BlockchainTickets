using Microsoft.AspNetCore.Http;
using System.Threading.Tasks;
using Microsoft.Extensions.Logging;

namespace BlockchainTicketsAPI.Middleware
{
    public class JWTErrorHandlingMiddleware
    {
        private readonly RequestDelegate _next;
        private readonly ILogger<JWTErrorHandlingMiddleware> _logger;

        public JWTErrorHandlingMiddleware(RequestDelegate next, ILogger<JWTErrorHandlingMiddleware> logger)
        {
            _next = next;
            _logger = logger;
        }

        public async Task InvokeAsync(HttpContext context)
        {
            try
            {
                await _next(context);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "An unhandled exception occurred.");
                if (!context.Response.HasStarted)
                {
                    context.Response.StatusCode = 500;
                    await context.Response.WriteAsync("An unexpected fault happened. Try again later.");
                }
                else
                {
                    _logger.LogWarning("The response has already started, the error handling middleware will not modify the response.");
                }
            }
        }
    }
}
