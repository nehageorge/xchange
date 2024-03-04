"""merging two heads
Revision ID: 60d71a0f4055
Revises: 22093c70b69b, ef52e75a2aec
Create Date: 2023-11-01 18:35:54.042076
"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '60d71a0f4055'
down_revision = ('22093c70b69b', 'ef52e75a2aec')
branch_labels = None
depends_on = None


def upgrade():
    pass


def downgrade():
    pass
