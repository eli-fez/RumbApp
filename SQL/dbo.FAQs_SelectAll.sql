USE [RumbApp]
GO
/****** Object:  StoredProcedure [dbo].[FAQs_SelectAll]    Script Date: 2/16/2024 10:33:13 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- Author: Katie Emery
-- Create date: 12/18/2023
-- Description: Selects all data from the FAQs table and the related Names from the FAQCategories table
-- Code Reviewer:

-- MODIFIED BY: author
-- MODIFIED DATE:12/1/2020
-- Code Reviewer:
-- Note:

ALTER PROC [dbo].[FAQs_SelectAll]

AS

/*

	EXEC dbo.FAQs_SelectAll

*/

BEGIN

	SELECT f.[Id]
		  ,f.[Question]
		  ,f.[Answer]
		  ,fc.[Id] AS FAQCategoryId
		  ,fc.[Name] AS FAQCategoryName
		  ,f.[SortOrder]
		  ,f.[DateCreated]
		  ,f.[DateModified]
		  ,dbo.fn_GetUserJSON(f.CreatedBy) AS CreatedBy
		  ,dbo.fn_GetUserJSON(f.ModifiedBy) AS ModifiedBy
		  

	FROM dbo.FAQs AS f INNER JOIN dbo.FAQCategories AS fc
			ON f.CategoryId = fc.Id

END

