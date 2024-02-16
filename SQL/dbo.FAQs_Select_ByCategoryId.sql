USE [RumbApp]
GO
/****** Object:  StoredProcedure [dbo].[FAQs_Select_ByCategoryId]    Script Date: 01/16/2024 10:31:27 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- Author: Elias Fernandez
-- Create date: 12/18/2023
-- Description: Selects data by CategoryId from the FAQs table and the related Names from the FAQCategories table
-- Code Reviewer:

-- MODIFIED BY: author
-- MODIFIED DATE:12/1/2020
-- Code Reviewer:
-- Note:

ALTER PROC [dbo].[FAQs_Select_ByCategoryId]
		@CategoryId int

AS

/* ---TESTCODE---

	EXEC dbo.FAQs_Select_ByCategoryId
			@CategoryId = 4

*/

BEGIN

	SELECT f.[Id]
		  ,f.[Question]
		  ,f.[Answer]
		  ,fc.[Id] AS CategoryId
		  ,fc.[Name] AS CategoryName
		  ,f.[SortOrder]
		  ,f.[DateCreated]
		  ,f.[DateModified]
		  ,dbo.fn_GetUserJSON(f.CreatedBy) AS CreatedBy
		  ,dbo.fn_GetUserJSON(f.ModifiedBy) AS ModifiedBy
		  

	FROM dbo.FAQs AS f INNER JOIN dbo.FAQCategories AS fc
			ON f.CategoryId = fc.Id

	WHERE @CategoryId = f.CategoryId

END


