using Microsoft.Data.SqlClient;

public class TestConnection
{
    public static async Task Test(string connectionString)
    {
        try
        {
            using var connection = new SqlConnection(connectionString);
            await connection.OpenAsync();
            Console.WriteLine("✅ Connected to Azure SQL successfully!");
            connection.Close();
        }
        catch (Exception ex)
        {
            Console.WriteLine($"❌ Connection failed: {ex.Message}");
        }
    }
}