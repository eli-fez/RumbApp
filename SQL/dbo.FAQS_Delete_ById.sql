USE [RumbApp]
GO
/****** Object:  StoredProcedure [dbo].[FAQs_Delete_ById]    Script Date: 01/16/2024 10:25:32 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- Author: Elias Fernandez
-- Create date: 12/19/2023
-- Description: Deletes data from the dbo.FAQs table
-- Code Reviewer:

-- MODIFIED BY:
-- MODIFIED DATE:
-- Code Reviewer:
-- Note:

ALTER PROC [dbo].[FAQs_Delete_ById]
	                        	@Id int
AS

/* --TESTCODE--

  EXEC dbo.FAQs_Delete_ById
		                @Id = 1

*/

BEGIN

      DELETE FROM [dbo].[FAQs]
      WHERE Id = @Id

END
