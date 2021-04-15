package kr.or.ddit.common.servlet;

import java.io.IOException;
import java.sql.SQLException;
import java.util.List;

import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import kr.or.ddit.common.service.CodeService;
import kr.or.ddit.common.vo.CodeVO;

@WebServlet("/CodeServlet")
public class CodeServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;

	@Override
	protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
		super.doPost(req, resp);
	}
	
	@Override
	protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
		// 그룹코드로 코드테이블 조회
		try {
		String groupCode = req.getParameter("groupCode");
		
		CodeVO codeVo = new CodeVO();
		codeVo.setGroupCode(groupCode);
		
		CodeService codeService = new CodeService();
//		codeService.retrieveCodeList(codeVo);
		
		List<CodeVO> initlist = codeService.retrieveGroupCodeList;
		List<CodeVO> list = codeService.retrieveCodeList(codeVo);
		
		req.setAttribute("list", list);
		req.setAttribute("initlist", initlist);
		
		RequestDispatcher  disp = req.getRequestDispatcher("/html/common/codeListResult.jsp");
		disp.forward(req, resp);
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}

	}
}
