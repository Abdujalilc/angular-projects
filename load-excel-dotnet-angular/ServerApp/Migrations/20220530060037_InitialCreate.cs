using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ServerApp.Migrations
{
    public partial class InitialCreate : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Personnels",
                columns: table => new
                {
                    PersonnelId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    RecordsPayroll_Number = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    RecordsForenames = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    RecordsSurname = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    RecordsDate_of_Birth = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    RecordsTelephone = table.Column<int>(type: "int", nullable: false),
                    RecordsMobile = table.Column<int>(type: "int", nullable: false),
                    RecordsAddress = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    RecordsAddress_2 = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    RecordsPostcode = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    RecordsEMail_Home = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    RecordsStart_Date = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Personnels", x => x.PersonnelId);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Personnels");
        }
    }
}
