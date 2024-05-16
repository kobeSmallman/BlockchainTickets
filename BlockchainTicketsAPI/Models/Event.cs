public class Event
{
    public int Id { get; set; }
    public string Name { get; set; }

    public Event()
    {
        Name = string.Empty;  // Ensure non-null
    }
}